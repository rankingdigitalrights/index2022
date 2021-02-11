/* eslint no-param-reassign: off */
import React from "react";

// import React, {useEffect, useMemo, useRef, useState} from "react";
// import {useInView} from "react-intersection-observer";
import FigureImg from "../../components/figure-img";
// import FigureSvg from "../../components/figure-svg";
import Layout from "../../components/layout";
import NarrativeContainer from "../../components/narrative-container";
import imgBarcode from "../../images/spotlights/alg-barcode-by-pawel-kuczynski.jpg";
import imgFacebookSegment from "../../images/spotlights/alg-facebook-segment-vladan-joler.jpeg";
import imgProtesters from "../../images/spotlights/alg-Protesters_at_the_endSARS_protest_in_Lagos,_Nigeria_54.jpg";
import imgShareGraphic from "../../images/spotlights/alg-share-placeholder.jpg";
// import {components} from "../../mdx";
// import {NarrativeProps} from "../../types";
import imgDummyPlaceholder from "../../images/spotlights/dummy-image-placeholder.png";

const SpotAlgorithms = () => {
  // const [ioHook2] = useInView({
  //   threshold: [0.6],
  //   triggerOnce: true,
  // });

  return (
    <Layout>
      <NarrativeContainer
        heroClassName="hero-full hero-algorithms"
        heroCaption="TODO: TITLE | DESCRIPTION. Original art by Paweł Kuczyński"
        backgroundClassName="bg-rdr bg-opacity-30"
        transparent
      >
        {({Container}) => {
          return (
            <Container>
              <div className="flex mb-12 border-b border-prissian py-12">
                <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
                  <span className="mt-3 md:mt-0">
                    Moving fast and breaking us all: Big Tech&rsquo;s
                    unaccountable algorithms
                  </span>
                </h1>
              </div>

              <div className="author-byline mb-9">By: [TODO]</div>

              <section>
                <p>
                  They decide{" "}
                  <a href="https://www.theguardian.com/commentisfree/2020/aug/19/ditch-the-algorithm-generation-students-a-levels-politics">
                    who passes and who fails
                  </a>{" "}
                  in secondary school. They decide{" "}
                  <a href="https://www.nytimes.com/2020/06/24/technology/facial-recognition-arrest.html">
                    who gets arrested
                  </a>{" "}
                  and{" "}
                  <a href="https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm">
                    who goes to prison
                  </a>
                  . They decide what news you see first thing in the morning as
                  well as what{" "}
                  <a href="https://shorensteincenter.org/the-fight-against-disinformation-in-the-u-s-a-landscape-analysis/">
                    news you won&rsquo;t see
                  </a>
                  . And they drive the business models&mdash;and
                  revenues&mdash;of the world&rsquo;s largest and most powerful
                  digital platforms.
                </p>
                <p>
                  In spite of all this, many of the world&rsquo;s most powerful
                  algorithms are accountable to no one&mdash;not even the
                  companies that build and deploy them. Some have made vague
                  pledges to &ldquo;be ethical,&rdquo; and for all we know,
                  there may be strong policies or rules that the companies
                  follow behind closed doors. But the overall lack of public
                  explanation of how these systems are built and run indicates
                  that companies do not have oversight over how their own
                  systems work. In light of the enormous effects that they have
                  on human rights, public health, public safety, democracy, and
                  our understanding of reality, this is nothing short of
                  reckless.
                </p>
                <p>
                  For the 2020 RDR Index, we looked for companies&rsquo; answers
                  to some fundamental questions about algorithms: How do you
                  build and train them? What do they do? What standards guide
                  these processes?&nbsp;
                </p>
                <p>
                  We combed the public-facing documentation and, to no surprise,
                  found very, very little. Yet companies are harvesting user
                  data by the minute, to fuel algorithmic optimization,
                  engagement, and personalization&mdash;all things that
                  translate to enormous profits.
                </p>
                <blockquote>
                  ...our findings suggest that much of the technology driving
                  revenue for the world&rsquo;s most powerful digital platforms
                  is accountable to no one&mdash;not even the companies
                  themselves.
                </blockquote>
                <p>
                  In the absence of this information, all we have is a set of
                  clues. Companies offer small hints at how their systems work,
                  both in their policies and in public statements. Other
                  information has bubbled up through investigative journalism
                  efforts and technical research. With our findings from a new
                  set of indicators that evaluate company disclosures on
                  algorithmic systems and targeted advertising, we seek to
                  contribute to these efforts, by putting what we have learned
                  into the broader context of what is publicly known about the
                  algorithmic systems of digital platforms.
                </p>
              </section>
              <section>
                <h2>Why set human rights standards for algorithms?</h2>
                <p>
                  When we expanded our methodology, we drew on recommendations
                  from nearly 100 digital rights experts around the world, along
                  with intergovernmental entities including the{" "}
                  <a href="https://search.coe.int/cm/pages/result_details.aspx?objectid=09000016809e1154">
                    Council of Europe
                  </a>{" "}
                  and the UN{" "}
                  <a href="https://freedex.org/mapping-ais-impact-on-freedom-of-expression/">
                    Special Rapporteur on the right to freedom of opinion and
                    expression
                  </a>
                  .&nbsp;
                </p>
                <p>
                  A majority of these stakeholders have found, and we agree,
                  that it is imperative to apply an international human rights
                  framework to the development and deployment of algorithms. A
                  human rights framework would not just set forth standards for
                  how to &ldquo;do no harm&rdquo; or &ldquo;be ethical,&rdquo;
                  but it would help hold companies accountable for those
                  standards, by providing mechanisms for risk assessment,
                  enforcement, redress when harm has occurred, and individual
                  empowerment for technology users.
                </p>
              </section>
              <section>
                <h2>What do we ask companies?</h2>
                <p>
                  RDR&rsquo;s standards offer companies a road map for building
                  policies to support algorithmic transparency.
                </p>
                <p>
                  First and foremost, we expect companies to establish a policy
                  or set of requirements aimed at protecting users&rsquo; rights
                  to freedom of expression, privacy, and non-discrimination in
                  both the development and use of what we term
                  &ldquo;algorithmic systems,&rdquo; which use algorithms,
                  machine learning, and other technologies to automate,
                  optimize, and/or personalize use of their platforms. We see a
                  policy like this as paving the way for companies to make their
                  algorithmic systems transparent and accountable to the public.
                  While two of the telcos (Telef&oacute;nica and Vodafone) we
                  rank published such commitments, none of the digital platforms
                  in the RDR Index have done this.
                </p>
                <p>
                  From there, our approach is twofold. First, we ask how
                  companies build and train their algorithms, practices often
                  rooted in data collection and data inference, whereby
                  companies use data they have to predict users&rsquo; behaviors
                  or attributes. Then, we look at how companies use algorithms
                  to moderate and promote content, practices that have big
                  implications for freedom of expression and information.
                </p>
                <FigureImg
                  img={imgShareGraphic}
                  caption="TODO"
                  alt="TODO - Demonstrators protest a network shutdown in Myanmar. Photo by Nyinyi Lwin, used with permission."
                />
                <h3>How do they feed their algorithms?</h3>
                <p>
                  We know that companies collect and classify people&rsquo;s
                  personal and behavioral data at a massive scale in order to
                  fuel their algorithmic systems. Some companies indicate as
                  much in their privacy policies.&nbsp;
                </p>
                <p>
                  We all know from experience that this data is used to
                  determine what we see online, in everything from search
                  results, to news feed items, to ads that target us to a
                  creepily precise degree. This can range from the mundane (
                  <a href="https://www.wired.com/story/online-ad-targeting-does-work-as-long-as-its-not-creepy/">
                    ads for a store
                  </a>{" "}
                  where you recently made a purchase) to the absurd (ads for{" "}
                  <a href="https://www.nytimes.com/2012/02/19/magazine/shopping-habits.html?pagewanted=all&amp;_r=0&amp;mtrref=undefined">
                    baby products
                  </a>{" "}
                  before you&rsquo;ve told anyone that you&rsquo;re pregnant) to
                  the dangerous (ads that tell you the{" "}
                  <a href="https://www.ft.com/content/d794197a-3b1b-4d6b-8b01-291537003c42">
                    wrong polling date
                  </a>{" "}
                  for a major election.)
                </p>
                <p>
                  Yet only three digital platforms in our set&mdash;
                  <a href="https://docs.google.com/spreadsheets/d/1WmI5QXq2p4tVY3JdfFV8Ra5DV3wp7bhH6ufo2Mzpkhw/edit#gid=1371866175">
                    Alibaba
                  </a>
                  ,{" "}
                  <a href="https://docs.google.com/spreadsheets/d/1tvk9IH-BJ5QL-MWrAG-pHURXLVsodnG_XIKZtSK6SP0/edit#gid=1816460555">
                    Apple
                  </a>
                  , and{" "}
                  <a href="https://docs.google.com/spreadsheets/d/17LIVa6Mj2ARm7E7aRHmIdvaD0UWxY4SA0C5YY166GBE/edit#gid=43811599">
                    Baidu
                  </a>{" "}
                  (P7.7, P7.8)&mdash;informed users that their information is
                  used to develop or train algorithmic systems. Apple went a bit
                  further,{" "}
                  <a href="https://www.apple.com/legal/privacy/en-ww/governance/">
                    making a vague promise
                  </a>{" "}
                  to provide users with a &ldquo;means to consent and control
                  such data use,&rdquo; but we found no direct evidence of when
                  or how this actually happens.
                </p>
                <FigureImg
                  img={imgBarcode}
                  caption="TODO - TITLE | DESCRIPTION. Original art by Paweł Kuczyński"
                  alt="TODO"
                />
                <h3>How do the algorithms work?</h3>
                <p>
                  No digital platform in the RDR Index offered anything close to
                  an adequate explanation of how its algorithms work. A few
                  published simplistic summaries of how specific systems work,
                  typically in response to public pressure.
                </p>
                <h4>Search</h4>
                <p>
                  Three search engines, Google Search, Microsoft&rsquo;s Bing,
                  and Yandex Search (F1d) published high-level explanations of
                  how their search algorithms work, describing the major
                  parameters in search ranking, such as relevance of web pages,
                  quality of content, context, and settings.&nbsp;
                </p>
                <p>
                  These descriptions hardly account for the evidence of bias or
                  interference of various kinds that researchers have exposed
                  over the years.<sup footnote-data="">1</sup>In April 2020,
                  Russian internet users{" "}
                  <a href="https://meduza.io/en/news/2020/04/28/yandex-says-its-experimental-search-results-trashing-alexey-navalny-were-a-mistake">
                    {" "}
                    suddenly began seeing
                  </a>{" "}
                  &ldquo;overwhelmingly negative&rdquo; results when seeking
                  information about opposition politician Alexey Navalny on
                  Yandex&rsquo;s search engine. In a subsequent public
                  statement, the company explained that the change was due to an
                  experimental feature that engineers had tested and later
                  removed from the platform. But this explanation came only in
                  response to public pressure. Countless other changes or
                  instances of bias might occur, but they typically come to
                  light only when they connect with major issues or public
                  figures, as in the case of Navalny
                </p>
                <h4>Content curation and moderation</h4>
                <p>
                  Nine of the 14 digital platforms we evaluated provided some
                  information about whether they used algorithmic systems to
                  curate, recommend, or rank content displayed to users (LINK TO
                  F12.1). All were vague about how the algorithms were deployed
                  for these purposes.&nbsp;
                </p>
                <p>
                  Although Google has made many references to the algorithms
                  that curate and recommend content on YouTube, it published
                  even less information about these systems than its U.S.
                  counterparts. This is troubling, given what independent
                  researchers have unearthed about YouTube&rsquo;s propensity
                  for recommending &ldquo;extreme&rdquo; content in an effort to
                  increase users&rsquo; time on the site. A search for political
                  information can lead surprisingly quickly to violent{" "}
                  <a href="https://dl.acm.org/doi/abs/10.1145/3351095.3372879?download=true">
                    extremist content
                  </a>
                  . And people searching for child pornography, which is illegal
                  and banned on the site, have nevertheless found their way to{" "}
                  <a href="https://www.nytimes.com/2019/06/03/world/americas/youtube-pedophiles.html">
                    videos of children
                  </a>{" "}
                  at the beach
                </p>
                <FigureImg
                  img={imgDummyPlaceholder}
                  caption="Does the company clearly disclose how users' online content is curated, ranked, or recommended?"
                  alt="TODO - Does the company clearly disclose how users' online content is curated, ranked, or recommended?"
                />
                <p>
                  Facebook and Twitter (F1d) each published pages with
                  generalized descriptions of how their most popular features
                  (News Feed and Timeline, respectively) decide what to display
                  and what factors influence their ranking, like recency,
                  presence of photos or video, and user interactions, but this
                  information was fragmented at best.&nbsp;
                </p>
                <p>
                  This is especially concerning in the case of Facebook, which
                  has myriad features across its services that rely on
                  algorithms, such as the recommendation algorithm, the
                  controversial{" "}
                  <a href="https://gizmodo.com/people-you-may-know-a-controversial-facebook-features-1827981959">
                    &ldquo;people you may know&rdquo;
                  </a>{" "}
                  feature, and various algorithms used to filter or censor
                  content that violates the company&rsquo;s rules.
                </p>
                <p>
                  Among the companies we rank, Facebook has been the source of
                  some of the more disturbing&nbsp; real-life harms that
                  algorithmic systems can trigger. But the company offers the
                  public no actionable information about how these algorithmic
                  systems are built, how they operate, or how the company
                  monitors them. Two recent examples illustrate the real-life
                  consequences of allowing these systems to operate without
                  meaningful oversight or accountability.
                </p>
                <p>
                  Facebook&rsquo;s recommendation algorithm, which offers users
                  suggestions on groups they might want to join, has attracted
                  concern due to its propensity for driving users to groups with
                  extremist ideologies. Soon after the{" "}
                  <a href="https://en.wikipedia.org/wiki/2021_storming_of_the_United_States_Capitol">
                    January 2021 attack
                  </a>{" "}
                  on the U.S. Capitol,{" "}
                  <a href="https://www.techtransparencyproject.org/articles/capitol-attack-was-months-making-facebook.">
                    evidence emerged
                  </a>{" "}
                  that some of the attackers had connected with each other on
                  Facebook groups of this nature.
                </p>
                <p>
                  Months before, in October 2020, Facebook CEO{" "}
                  <a href="https://www.c-span.org/video/?476686-1/social-media-content-moderation">
                    Mark Zuckerberg told the U.S. Congress
                  </a>{" "}
                  that the company had stopped recommending all &ldquo;political
                  content or social issue groups,&rdquo; a clear sign that the
                  company recognized a problem with the algorithm.
                  <sup footnote-data="">2</sup> But recent research by{" "}
                  <a href="https://themarkup.org/citizen-browser/2021/01/19/facebook-said-it-would-stop-pushing-users-to-join-partisan-political-groups-it-didnt">
                    The Markup
                  </a>
                  , an investigative journalism nonprofit, showed that the
                  platform in fact has continued making these kinds of
                  recommendations. When reporters contacted the company about
                  its findings, a Facebook staffer replied that staff were
                  &ldquo;investigating why these [extremist groups] were
                  recommended in the first place.&rdquo;
                </p>
                <p>
                  Evidence like this casts a long shadow over the promises that
                  companies make in their policies, especially when the
                  enforcement of those policies is left up to algorithmic
                  systems.&nbsp;
                </p>
                <p>
                  But even when a company does seem to have control over its
                  technology, there is plenty of margin for error that can lead
                  to real-life harm. This is especially evident with algorithmic
                  systems that proactively identify and censor content that
                  violates content rules, a practice that we know results in
                  untold quantities of posts and accounts being restricted in
                  error.
                </p>
                <FigureImg
                  img={imgProtesters}
                  caption="Demonstrators in Lagos, Nigeria in October 2020. Photo by Kaizenify via Wikimedia Commons (CC BY-SA 4.0)"
                  alt="TODO - Demonstrators in Lagos, Nigeria in October 2020. Photo by Kaizenify via Wikimedia Commons (CC BY-SA 4.0)"
                />
                <p>
                  Another example of these problems in action comes from October
                  2020, when Nigerians took to the streets calling for an end to
                  the country&rsquo;s{" "}
                  <a href="https://en.wikipedia.org/wiki/End_SARS">
                    Federal Special Anti-Robbery Squad
                  </a>{" "}
                  (known locally as SARS), a law enforcement agency notorious
                  for corruption and abuse. When protesters were met with a
                  violent response from the Nigerian army, social media lit up
                  with graphic photos and videos of demonstrators being{" "}
                  <a href="https://www.amnesty.org/en/latest/news/2020/10/killing-of-endsars-protesters-by-the-military-must-be-investigated/">
                    shot and killed
                  </a>
                  , typically accompanied by the hashtag #EndSARS.&nbsp;
                </p>
                <p>
                  Instagram (which is owned by Facebook) began flagging #EndSARS
                  posts as &ldquo;false&rdquo; and reducing their distribution,
                  due to what a Facebook employee later explained was a system
                  error that confused the hashtag with false information related
                  to the coronavirus, also known as SARS CoV-2.
                </p>
                <p>
                  When University of Pretoria scholar Tomiwa Ilori inquired
                  about the error, a Facebook employee explained: &ldquo;In this
                  situation, there was a post with a doctored image about the
                  SARS virus that was debunked...then our systems began fanning
                  out to auto-match to other images&hellip;.This is why the
                  system error accidentally matched some of the #EndSARS posts
                  as misinformation.&rdquo; The system error resulted in the
                  flagging and potential censorship of untold quantities of
                  posts containing not only protest messages, but also photo and
                  video evidence of human rights violations carried out by the
                  Nigerian army.
                </p>
                <p>
                  Reflecting on the gravity of Instagram&rsquo;s error in a
                  piece for Slate, Ilori wrote: &ldquo;Social media companies
                  cannot continue to wish away their responsibility to protect
                  human rights.&rdquo;
                </p>
                <h3>
                  Do companies measure the risks that their systems pose for
                  human rights?
                </h3>
                <p>
                  Alongside notorious cases from{" "}
                  <a href="https://www.aljazeera.com/news/2020/8/15/facebook-ignored-hate-speech-by-indias-bjp-politicians-report">
                    India
                  </a>
                  ,{" "}
                  <a href="https://www.reuters.com/article/us-myanmar-rohingya-facebook-idUSKCN1GO2PN">
                    Myanmar
                  </a>
                  ,{" "}
                  <a href="https://www.theguardian.com/world/2019/nov/11/facebook-sri-lanka-election-fake-news">
                    Sri Lanka
                  </a>
                  , and beyond, the examples above demonstrate the urgent need
                  for companies to assess the human rights risks that their
                  platforms can pose for users and the public at large.
                </p>
                <p>
                  When we looked for evidence of companies&rsquo; efforts to
                  mitigate harm by assessing their algorithmic systems, the
                  results were disappointing once again. Most companies in the
                  RDR Index did not take such steps, and those that did still
                  leave much to be desired.
                </p>
                <FigureImg
                  img={imgDummyPlaceholder}
                  caption="In its development and use of algorithmic systems, does the company assess risks associated with freedom of expression, privacy, or discrimination?"
                  alt="TODO - In its development and use of algorithmic systems, does the company assess risks associated with freedom of expression, privacy, or discrimination?"
                />
                <p>
                  Apple, Facebook, Google, Verizon Media (owner of Yahoo Mail),
                  and Microsoft{" "}
                  <a href="https://docs.google.com/spreadsheets/d/1y1W90PGKCJ0SP-7BQM1L9ACUGFgDjt3-ATpRGwMTuXk/edit?ts=60115956#gid=1412811080">
                    (G4d){" "}
                  </a>
                  conducted human rights impact assessments to see if their
                  algorithmic systems might cause discrimination or violate
                  people&rsquo;s privacy. But most of these companies offered
                  little additional information, failing to describe what these
                  processes actually entail and what groups or contexts they
                  consider when conducting such assessments. For example, in its{" "}
                  <a href="https://aka.ms/Annualhumanrightsreport2019">
                    Annual Human Rights Report
                  </a>{" "}
                  for 2019, for example, Microsoft stated that it &ldquo;began a
                  major forward looking Human Rights Impact Assessment (HRIA) at
                  the start of FY17 into Microsoft&rsquo;s growing portfolio and
                  expertise in artificial intelligence (AI),&rdquo; but offered
                  no further detail on the impact assessment.
                </p>
                <blockquote>
                  &ldquo;Social media companies cannot continue to wish away
                  their responsibility to protect human rights.&rdquo;
                  &mdash;Tomiwa Ilori, University of Pretoria
                </blockquote>
                <p>
                  Facebook was the only company in the RDR Index that conducted
                  a human rights impact assessment on its ad-targeting practices
                  [LINK TO G4c], but its assessment was limited in scope. The
                  assessment came after the company&rsquo;s algorithmically
                  driven ad-targeting systems were called to task as part of an
                  external{" "}
                  <a href="https://about.fb.com/wp-content/uploads/2020/07/Civil-Rights-Audit-Final-Report.pdf">
                    Civil Rights Audit
                  </a>{" "}
                  that Facebook commissioned after groups in the U.S. brought a
                  civil suit against it for enabling routine violations of the
                  Fair Housing Act. This law prohibits real estate entities from
                  discriminating against prospective renters or buyers on the
                  basis of their race, ethnicity, or other identity traits. The
                  lawsuit came after investigative reporting and technical
                  testing by{" "}
                  <a href="https://www.propublica.org/article/facebook-lets-advertisers-exclude-users-by-race">
                    ProPublica
                  </a>{" "}
                  showed that Facebook&rsquo;s systems effectively enabled such
                  practices by allowing advertisers to choose which
                  &ldquo;racial affinity groups&rdquo; they wanted to target and
                  which ones they wanted to exclude.
                </p>
                <p>
                  The audit touched on the discriminatory impacts of
                  Facebook&rsquo;s algorithmic recommendation and ad-targeting
                  systems, but emphasized that the company&rsquo;s efforts to
                  mitigate these impacts were &ldquo;nascent&rdquo; and that the
                  auditors were &ldquo;not given full access to the full details
                  of these programs.&rdquo; The audit also was limited in scope,
                  covering only the U.S. market, and the company appears to only
                  have made adjustments to align its systems with U.S.
                  anti-discrimination laws. But Facebook is a global company.
                  The root causes of the problems that the audit assessed are by
                  no means limited to the U.S.
                </p>
              </section>
              <section>
                <h2>
                  Ethics commitments are not going to solve these problems
                </h2>
                <p>
                  While they have become a{" "}
                  <a href="https://wilkins.law.harvard.edu/misc/PrincipledAI_FinalGraphic.jpg">
                    popular answer
                  </a>{" "}
                  to questions about harm incurred by AI (especially in Silicon
                  Valley), ethics commitments have proven to be a toothless
                  tiger, showing little evidence that they actually help to
                  protect users&rsquo; rights.
                </p>
                <p>
                  In contrast to international human rights doctrine, which
                  offers a widely ratified and robust legal framework to guide
                  the development and use of these technologies, ethics
                  initiatives are neither legally binding nor enforceable. They
                  also tend to be normative, driven by the context in which they
                  are created. As{" "}
                  <a href="https://www.article19.org/resources/governance-with-teeth-how-human-rights-can-strengthen-fat-and-ethics-initiatives-on-artificial-intelligence/">
                    ARTICLE 19
                  </a>
                  &rsquo;s Vidushi Marda put it, they have &ldquo;become a
                  smokescreen for &lsquo;doing the right thing,&rsquo; even when
                  there is no clear understanding of what &lsquo;the right
                  thing&rsquo; is, or how to measure it.&rdquo;
                </p>
                <FigureImg
                  img={imgDummyPlaceholder}
                  caption="[#18 in Index graphics list] What commitments have digital platforms made, governing their development and use of algorithmic systems?"
                  alt="TODO - What commitments have digital platforms made, governing their development and use of algorithmic systems?"
                />
                <p>
                  Our results illustrate Marda&rsquo;s point. Of the digital
                  platforms we ranked, six are members of the{" "}
                  <a href="https://www.partnershiponai.org/partners/">
                    Partnership on AI
                  </a>{" "}
                  and four published some type of AI principles or ethics
                  commitment. None of the platforms published policies
                  demonstrating an effort to integrate respect for human rights
                  into their deployment of algorithms for their products and
                  services, where it actually counts for users.
                </p>
              </section>
              <section>
                <h2>
                  &ldquo;Like walking through a dark forest&rdquo;: Testing,
                  inferring, and imagining
                </h2>
                <p>
                  While the movement to force algorithms used by public agencies
                  into the light has made great strides in recent years,
                  advocates have made little progress when it comes to digital
                  platforms like the ones we rank.
                </p>
                <p>
                  In the absence of regulation that would force companies to
                  make their systems transparent and accountable to the public,
                  there is a growing class of researchers, journalists, and
                  artists who are taking matters into their own hands and
                  finding ways to show how corporate algorithms work&mdash;or at
                  least to imagine how they might work. For example, New York
                  University&rsquo;s{" "}
                  <a href="https://adobservatory.org/">Ad Observatory</a>{" "}
                  project collects technical data that sheds light on how ads
                  are targeted on Facebook, and offers a publicly accessible
                  archive of selected ads, with a focus on political
                  issues.&nbsp;
                </p>
                <p>
                  Citing a terms of service violation, Facebook sent a
                  cease-and-desist letter to the leaders of the project in
                  October 2020, shortly before the U.S. general election.
                  Speaking about the effects of Facebook&rsquo;s
                  cease-and-desist letter, Damon McCoy, a computer scientist
                  co-leading the project,{" "}
                  <a href="https://knightcolumbia.org/content/researchers-knight-institute-condemn-facebook-effort-to-squelch-research-on-disinformation">
                    said
                  </a>
                  :
                </p>
                <blockquote>
                  Facebook&rsquo;s algorithm...has enabled certain Facebook
                  advertisers to profile citizens and send them misinformation
                  about candidates and policies that are designed to influence
                  or even suppress their vote. Shutting down a key data source
                  for studying election interference and manipulation&mdash;in
                  November, of all months&mdash;impedes our efforts to safeguard
                  the democratic process.
                </blockquote>
                <p>
                  Others are using technical and social science research to
                  interpret what they know and to articulate a vision of what{" "}
                  <em>might</em> lie behind the screen. One famous example of
                  such efforts is tech scholars Kate Crawford and Vladan
                  Joler&rsquo;s &ldquo;Anatomy of an AI System,&rdquo; a
                  visualization of an artificial intelligence system which now
                  sits in the Museum of Modern Art in New York City. In an
                  earlier work, Joler used real data and technical sources to
                  build a detailed visualization that interprets how
                  Facebook&rsquo;s algorithms likely function.
                </p>
                <FigureImg
                  img={imgFacebookSegment}
                  caption="A subsection of Joler’s “Facebook Algorithmic Factory” (CC BY-NC-SA)."
                  alt="TODO - A subsection of Joler’s “Facebook Algorithmic Factory” (CC BY-NC-SA)."
                />
                <p>
                  In a recent conversation with us, Joler explained that his aim
                  was to create a map, something that could give us a picture of
                  what goes on inside Facebook&rsquo;s systems. &ldquo;It is
                  like walking through a dark forest with a torch,&rdquo; he
                  said of the visualization. &ldquo;This is based on real data.
                  But we don&rsquo;t know how much we don&rsquo;t know.&rdquo;
                </p>
                <p>
                  &ldquo;Even if they gave us all the mathematical functions
                  that they use, how does this function influence society?
                  That&rsquo;s really hard to understand,&rdquo; Joler told us.
                </p>
                <p>
                  This is what we have right now. Absent regulation, it will be
                  up to the companies to show us their work. Until that happens,
                  we must keep the torch lit.
                </p>
              </section>
            </Container>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default SpotAlgorithms;
