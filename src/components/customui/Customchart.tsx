import { AreaChart } from "@/components/retroui/charts/AreaChart";
import { Message } from "../../models/user.model";
import dayjs from "dayjs";


export default function ChartStyleDefault({ messages }: { messages: Message[] }) {
  const data = getMonthlyMessageData(messages);

  return (
    <div className="flex flex-col w-full ">
  <h1 className="text-black text-2xl px-14 font-bold mb-4 text-shadow-[0_0_10px_yellow] animate-fadeIn">
  Inbox Activity: Monthly
  </h1>

  <AreaChart
    data={data}
    index="month"
    categories={["count"]}
  />
</div>

  
  );
}

function getMonthlyMessageData(messages: Message[]) {
  if (!messages || messages.length === 0) {
    return generateYearSkeleton(new Date().getFullYear()); // 12 months, all 0
  }

  const currentYear = new Date().getFullYear();
  const counts: Record<string, number> = {};

  // Count only current year's messages
  for (const msg of messages) {
    const date = dayjs(msg.createdAt);
    if (date.year() === currentYear) {
      const key = date.format("MMM");

      counts[key] = (counts[key] || 0) + 1;
    }
  }

  return generateYearSkeleton(currentYear).map(({ month }) => ({
    month,
    count: counts[month] || 0,
  }));
}

function generateYearSkeleton(year: number) {
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().year(year).month(i).format("MMM")
  );
  return months.map((m) => ({ month: m, count: 0 }));
}
