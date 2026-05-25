import { Link } from "react-router-dom";
import { FileText, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden mt-12 md:mt-20">
      <div className="relative mx-auto max-w-7xl px-4 md:px-12 py-8 md:py-12">
        <div className="flex flex-col items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">
          {/* 左侧：版权信息 */}
          <p className="text-xs md:text-sm text-muted text-center md:justify-self-start md:text-left">
            © {currentYear} QGMING. 保留所有权利.
          </p>

          {/* 中间：协议入口 */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-self-center md:gap-3">
            <Link
              to="/privacy-policy"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-foreground md:text-sm"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              隐私政策
            </Link>
            <Link
              to="/terms-of-service"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-foreground md:text-sm"
            >
              <FileText className="h-3.5 w-3.5 text-accent" />
              用户协议
            </Link>
          </div>

          {/* 右侧：Made with */}
          <p className="text-xs md:text-sm text-muted flex items-center gap-1 text-center md:justify-self-end md:text-left">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by
            qgming
          </p>
        </div>
      </div>
    </footer>
  );
}
