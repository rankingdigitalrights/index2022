import React, {useEffect, useMemo, useRef} from "react";
import scrollama from "scrollama";

import Layout from "../../components/layout-spotlights";
import ScrollySteps from "../../components/spotlight-steps";
import {setupSpotlight} from "../../spotlights";

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

          <div className="scrolly-steps">
            <div
              className="step invisible"
              data-step="-99"
              data-color="bg-gray-400"
            />

            <ScrollySteps />
          </div>
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
