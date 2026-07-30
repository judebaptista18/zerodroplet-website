import {HomeContent} from '@/components/HomeContent';
import {getHomePage} from '@/sanity/lib/home-page';

export default async function Home() {
  const homePage = await getHomePage();
  return <HomeContent homePage={homePage} />;
}
