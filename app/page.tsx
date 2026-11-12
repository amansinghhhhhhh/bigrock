import { games, sections } from "@/lib/data";
import BannerHero from "@/components/sections/BannerHero";
import CategoryBento from "@/components/sections/CategoryBento";
import InplayOdds from "@/components/sections/InplayOdds";
import TopGamesRail from "@/components/sections/TopGamesRail";
import Steps from "@/components/sections/Steps";
import DemoAccounts from "@/components/sections/DemoAccounts";
import PromoSlider from "@/components/sections/PromoSlider";
import GameRail from "@/components/sections/GameRail";
import Payments from "@/components/sections/Payments";
import BigWins from "@/components/sections/BigWins";
import { IdCta, JoinStrip } from "@/components/sections/CtaStrips";
import TrustBento from "@/components/sections/TrustBento";
import Faq from "@/components/sections/Faq";
import SeoRead from "@/components/sections/SeoRead";

export default function Home() {
  return (
    <>
      <BannerHero />
      <CategoryBento />
      <InplayOdds />
      <TopGamesRail />
      <Steps />
      <DemoAccounts />
      <PromoSlider />
      <GameRail
        sectionId="originals"
        railId="originalsRail"
        title={sections.originals.title}
        games={games.originals}
        more={sections.originals.more}
        prevLabel="Previous originals"
        nextLabel="Next originals"
      />
      <GameRail
        sectionId="hot"
        railId="hotRail"
        title={sections.hot.title}
        games={games.hot}
        more={sections.hot.more}
        prevLabel="Previous hot games"
        nextLabel="Next hot games"
      />
      <Payments />
      <BigWins />
      <JoinStrip />
      <GameRail
        sectionId="slots"
        railId="slotsRail"
        title={sections.slots.title}
        games={games.slots}
        more={sections.slots.more}
        prevLabel="Previous slots"
        nextLabel="Next slots"
      />
      <GameRail
        sectionId="live-casino"
        railId="liveRail"
        title={sections.liveCasino.title}
        titleId="live-title"
        games={games.live}
        more={sections.liveCasino.more}
        prevLabel="Previous live tables"
        nextLabel="Next live tables"
      />
      <IdCta />
      <GameRail
        sectionId="bingo"
        railId="bingoRail"
        title={sections.bingo.title}
        games={games.bingo}
        variant="bingo"
        prevLabel="Previous bingo games"
        nextLabel="Next bingo games"
      />
      <TrustBento />
      <Faq />
      <SeoRead />
    </>
  );
}
