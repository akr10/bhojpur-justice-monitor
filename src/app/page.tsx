import HomePageContent from "@/components/HomePageContent";
import {
  getCommunityGrievances,
  toAccountabilityRow,
} from "@/lib/grievances";
import { fetchNewsFeed } from "@/lib/news-feed";

export const revalidate = 600;

export default async function Home() {
  const [newsItems, communityGrievances] = await Promise.all([
    fetchNewsFeed(),
    getCommunityGrievances(),
  ]);

  const communityRecords = communityGrievances.map(toAccountabilityRow);

  return (
    <HomePageContent
      newsItems={newsItems}
      communityRecords={communityRecords}
    />
  );
}
