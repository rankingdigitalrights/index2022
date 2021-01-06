/* eslint no-param-reassign: off */

import React, {useEffect, useMemo, useRef} from "react";
import scrollama from "scrollama";

import story from "../../../data/spotlights/spotlight-1.json";
import Iframe from "../../components/iframe";
import Layout from "../../components/layout-spotlights";
import ScrollySteps from "../../components/spotlight-steps";
import {setupSpotlight} from "../../spotlights";

console.log(story);

/* importing a PNG fails, both from /static/ and /public/ */
/* React calls for Webpack */
/* cf. https://create-react-app.dev/docs/adding-images-fonts-and-files/ */
// import dwMapDummy from "../../../public/spotlights/datawrapper-map-dummy.png";
// import dwMapDummy from "%PUBLIC_URL%/spotlights/datawrapper-map-dummy.png";
console.log(process.env.PUBLIC_URL); // undefined

const datawrapperIframe = `<iframe title="Countries with Facebook's internet.org" aria-label="Map" id="datawrapper-chart-mcT4c" src="https://datawrapper.dwcdn.net/mcT4c/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="402" />`;

const SpotlightOne = () => {
  const scrolly1El = useRef(undefined);
  const scroller1 = useMemo(() => scrollama(), []);

  useEffect(() => {
    const unmount1 = setupSpotlight(scrolly1El, scroller1, "#scrolly-1 .step");

    return () => {
      unmount1();
    };
  }, [scroller1, scrolly1El]);

  return (
    <Layout>
      <main className="container mx-auto spotlight">
        <section className="max-w-6xl">
          <h2>Intro</h2>

          <p>
            Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
            yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin
            grog yardarm hempen halter furl. Swab barque interloper chantey
            doubloon starboard grog black jack gangway rutters.
          </p>

          <p>
            Deadlights jack lad schooner scallywag dance the hempen jig carouser
            broadside cable strike colors. Bring a spring upon her cable
            holystone blow the man down spanker Shiver me timbers to go on
            account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
            squiffy black spot yardarm spyglass sheet transom heave to.
          </p>

          <p>
            Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
            gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup
            ballast Blimey lee snow crows nest rutters. Fluke jib scourge of the
            seven seas boatswain schooner gaff booty Jack Tar transom spirits.
          </p>
        </section>

        {/* Datawrapper Embed */}
        {/* injecting vanilla HTML snippets would be the most pleasant approach of course */}
        {/* for embedding datawrapper, there is a node package https://www.npmjs.com/package/react-data-wrapper?activeTab=readme */}
        {/* not sure if developing a custom component is feasible */}

        <section className="datawrapper-dummy-embed">
          <Iframe html={datawrapperIframe} />

          {/* PNG Embed */}
          <figure className="datawrapper-dummy-png" />
        </section>

        <section>
          <figure className="datawrapper-dummy-png">
            <img src="" alt="" />
          </figure>
        </section>

        <section className="max-w-6xl">
          <h2>Analysis 1</h2>

          <p>
            Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
            yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin
            grog yardarm hempen halter furl. Swab barque interloper chantey
            doubloon starboard grog black jack gangway rutters.
          </p>

          <p>
            Deadlights jack lad schooner scallywag dance the hempen jig carouser
            broadside cable strike colors. Bring a spring upon her cable
            holystone blow the man down spanker Shiver me timbers to go on
            account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
            squiffy black spot yardarm spyglass sheet transom heave to.
          </p>

          <p>
            Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
            gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup
            ballast Blimey lee snow crows nest rutters. Fluke jib scourge of the
            seven seas boatswain schooner gaff booty Jack Tar transom spirits.
          </p>
        </section>

        <section id="scrolly-1" ref={scrolly1El} className="scrolly">
          <h2>Scrolly 1</h2>

          <div id="scrolly-canvas" className="scrolly-canvas">
            <figure className="scrolly-figure bg-gray-200">
              <p id="scene-counter">Off</p>
              <p id="index-counter">Off</p>
            </figure>
          </div>

          <ScrollySteps story={story} />
        </section>

        <section id="analysis-3" className="max-w-6xl">
          <h2>Analysis 3</h2>

          <p>
            Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
            yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin
            grog yardarm hempen halter furl. Swab barque interloper chantey
            doubloon starboard grog black jack gangway rutters.
          </p>

          <p>
            Deadlights jack lad schooner scallywag dance the hempen jig carouser
            broadside cable strike colors. Bring a spring upon her cable
            holystone blow the man down spanker Shiver me timbers to go on
            account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
            squiffy black spot yardarm spyglass sheet transom heave to.
          </p>

          <p>
            Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
            gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup
            ballast Blimey lee snow crows nest rutters. Fluke jib scourge of the
            seven seas boatswain schooner gaff booty Jack Tar transom spirits.
          </p>
        </section>

        <section id="outro" className="max-w-6xl">
          <h2>Outro</h2>

          <p>
            Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
            yardarm. Pinnace holystone mizzenmast quarter crows nest nipperkin
            grog yardarm hempen halter furl. Swab barque interloper chantey
            doubloon starboard grog black jack gangway rutters.
          </p>

          <p>
            Deadlights jack lad schooner scallywag dance the hempen jig carouser
            broadside cable strike colors. Bring a spring upon her cable
            holystone blow the man down spanker Shiver me timbers to go on
            account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
            squiffy black spot yardarm spyglass sheet transom heave to.
          </p>

          <p>
            Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
            gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup
            ballast Blimey lee snow crows nest rutters. Fluke jib scourge of the
            seven seas boatswain schooner gaff booty Jack Tar transom spirits.
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default SpotlightOne;
