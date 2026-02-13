import heroData from '@/data/hero.json'

export default function HeroSection() {
  return (
    <section className="relative h-[50vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* 主内容 */}
      <div className="text-center space-y-4 md:space-y-6 px-6 md:px-6 animate-fade-in-up">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-tight">
          {heroData.title}
          <br />
          <span className="text-accent">{heroData.titleAccent}</span>
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {heroData.subtitle}
        </p>
      </div>
    </section>
  );
}
