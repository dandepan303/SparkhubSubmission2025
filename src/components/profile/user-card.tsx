import { User } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type StatProps = { label: string; value: string | number };

function Stat({ label, value }: StatProps) {
  return (
    <div className="flex flex-col rounded-lg border p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-base font-medium">{value}</span>
    </div>
  );
}

export default function UserCard({ user }: { user: User }) {
  const initials = (user.name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const offeringsCount = user.offerings?.length ?? 0;
  const jobsCreatedCount = user.jobsCreated?.length ?? 0;
  const jobsWorkingCount = user.jobsWorking?.length ?? 0;
  const ratingsGivenCount = user.ratingFrom?.length ?? 0;
  const ratingsReceivedCount = user.ratingTo?.length ?? 0;

  const avgReceivedRating =
    ratingsReceivedCount > 0
      ? Math.round(
          ((user.ratingTo ?? []).reduce((sum, r) => sum + r.value, 0) / ratingsReceivedCount) * 10
        ) / 10
      : null;

  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-";
  const updatedDate = user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "-";

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {initials}
          </div>
          <div className="flex flex-col">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {user.contactInfo && (
          <div className="mb-4 text-sm">
            <span className="text-muted-foreground">Contact: </span>
            <span>{user.contactInfo}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Offerings" value={offeringsCount} />
          <Stat label="Jobs Created" value={jobsCreatedCount} />
          <Stat label="Jobs Working" value={jobsWorkingCount} />
          <Stat label="Ratings Given" value={ratingsGivenCount} />
          <Stat label="Ratings Received" value={ratingsReceivedCount} />
          <Stat label="Avg Rating" value={avgReceivedRating ?? "-"} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 text-xs text-muted-foreground">
        <span>Joined: {joinedDate}</span>
        <span>Updated: {updatedDate}</span>
      </CardFooter>
    </Card>
  );
}