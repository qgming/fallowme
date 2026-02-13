import { useProjects } from "@/contexts/ProjectContext";
import HeroSection from "@/components/home/HeroSection";
import BentoGrid from "@/components/home/BentoGrid";

export default function Home() {
  const { projects } = useProjects();

  return (
    <div className="relative min-h-screen">
      {/* Hero 区域 */}
      <HeroSection />

      {/* 项目展示区域 */}
      <section
        id="projects"
        className="py-6 md:py-6 px-6 md:px-12 pb-12 md:pb-[20rem]"
      >
        <div className="mx-auto max-w-7xl">
          {/* 项目网格 */}
          <BentoGrid projects={projects} />
        </div>
      </section>
    </div>
  );
}
