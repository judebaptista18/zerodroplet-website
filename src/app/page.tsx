import {HomeContent} from '@/components/HomeContent';
import {getServices} from '@/sanity/lib/services';

export default async function Home() {
  const services = await getServices();
  return <HomeContent services={services} />;
}
