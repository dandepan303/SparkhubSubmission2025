import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { parseError } from "@/lib/util/server_util";
import { JobGetRet } from "@/types";
import { publicUserData } from "@/lib/config";
import { JobStatus } from "@/lib/prisma/generated";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get("id");

        const supabase = await createServerSupabaseClient();

        let currentUserId: string | undefined;
        try {
            const authHeader = request.headers.get("authorization");
            const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
            const { data, error } = token ? await supabase.auth.getUser(token) : await supabase.auth.getUser();
            if (!error) {
                currentUserId = data?.user?.id;
            }
        } catch {
            currentUserId = undefined;
        }

        // GET LIST OF JOBS
        if (!jobId) {
            const whereQuery = currentUserId
                ? {
                      OR: [
                          { status: "SEARCHING"  as JobStatus},
                          { hirerId: currentUserId },
                          { workerId: currentUserId }
                      ]
                  }
                : {
                      status: "SEARCHING" as JobStatus
                  };

            const jobs = await prisma.job.findMany({
                where: whereQuery,
                include: {
                    hirer: { select: publicUserData },
                    worker: { select: publicUserData },
                    applications: { select: publicUserData },
                    ratings: {
                        include: {
                            from: { select: publicUserData },
                            to: { select: publicUserData },
                        },
                    },
                },
            });

          console.log('jobs', jobs);

            if (!jobs) return NextResponse.json<JobGetRet>({ status: "error", message: "Job not found" }, { status: 404 });

            return NextResponse.json<JobGetRet>(
                {
                    status: "success",
                    message: "Job retrieved successfully",
                    jobs: jobs,
                },
                { status: 200 }
            );
        }

        // GET SPECIFIC JOB
        const jobOwner = await prisma.job.findUnique({
            where: { id: jobId },
            select: { id: true, hirerId: true },
        });

        const isAuthor = currentUserId && jobOwner && currentUserId === jobOwner.hirerId;

        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: isAuthor
                ? {
                      hirer: true,
                      worker: true,
                      applications: true,
                  }
                : {
                      hirer: { select: publicUserData },
                      worker: { select: publicUserData },
                      applications: { select: publicUserData },
                      ratings: {
                          include: {
                              from: { select: publicUserData },
                              to: { select: publicUserData },
                          },
                      },
                  },
        });

        if (!job) {
            return NextResponse.json<JobGetRet>({ status: "error", message: "Job not found" }, { status: 404 });
        }

        return NextResponse.json<JobGetRet>(
            {
                status: "success",
                message: "Job retrieved successfully",
                jobs: [job],
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.log("api/job/[id]/route.ts GET error:", err);
        return NextResponse.json<JobGetRet>({ status: "error", message: await parseError(err.message, err.code) }, { status: 500 });
    }
}
