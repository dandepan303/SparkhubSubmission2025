import { DefaultAPIRet } from "@/types";

export default function JobsList() {
  const loadJobs = async () => { 
    const controller = new AbortController();
      setTimeout(() => controller.abort(), 1000 * 60); // 60 second timeout

      const {
        data: { res },
      }: { data: { res: DefaultAPIRet } } = await axios.get(`/api/profile/${userId}`, {
        signal: controller.signal,
        withCredentials: true,
        validateStatus: () => true,
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
  }

  return (
    <div>todo: jobs list</div>
  )
}