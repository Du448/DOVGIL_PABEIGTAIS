import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { headers } from "next/headers";
import { getLocaleFromPathname, locales } from "@/lib/i18n";
import { CompareProvider } from "@/lib/compare";
import CompareBar from "@/components/CompareBar";
import { RfqProvider } from "@/lib/rfq";
import MotionProvider from "@/components/motion/MotionProvider";
import PageTransitionFM from "@/components/motion/PageTransitionFM";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";

// Fonts via next/font with display swap
const inter = Inter({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  const title =
    locale === "lv"
      ? "DOVGIL — ārdurvis un iekšdurvis Latvijā"
      : locale === "en"
        ? "DOVGIL — exterior and interior doors in Latvia"
        : "DOVGIL — lauko ir vidaus durys Latvijoje";

  const description =
    locale === "lv"
      ? "DOVGIL: ārdurvis un iekšdurvis, profesionāla montāža un piegāde visā Latvijā. Plašs sortiments, konsultācijas un garantija."
      : locale === "en"
        ? "DOVGIL: exterior and interior doors, professional installation and delivery across Latvia. Wide assortment, consultations and warranty."
        : "DOVGIL: lauko ir vidaus durys, profesionalus montavimas ir pristatymas visoje Latvijoje. Platus asortimentas, konsultacijos ir garantija.";

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv"),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "DOVGIL",
      locale: locale === "lv" ? "lv_LV" : locale === "en" ? "en_US" : "lt_LT",
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
      other: [{ rel: "logo", url: "/logo.svg" }],
    },
  };
}

export default async function RootLayout({ children }) {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <TooltipProvider>
          <CompareProvider>
            <RfqProvider>
              <MotionProvider>
                <Header />
                <PageTransitionFM>
                  {children}
                </PageTransitionFM>
                <Footer />
                <CompareBar />
                {/* Privacy-first cookie banner (defaults to essential-only) */}
                <CookieConsent />
                {/* Analytics only loads when consent is given and env vars are set */}
                <AnalyticsLoader />
              </MotionProvider>
            </RfqProvider>
          </CompareProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
