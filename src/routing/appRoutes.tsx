import { Redirect, Route, Switch } from "wouter";
import CatView from "@views/catView";
import BreedView from "@views/breedView";
import FavouritesView from "@views/favouritesView";
import CatDetailsModal from "@components/catDetailsModal";
import BreedExploreModal from "@components/exploreBreedModal";
import type { AvailableBreedsEnumType } from "@api/types.ts";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/cats" nest>
        <CatView />
        <Route path="/:id">
          {(params) => <CatDetailsModal id={params.id} />}
        </Route>
      </Route>
      <Route path="/breeds" nest>
        <BreedView />
        <Route path="/:id">
          {(params) => (
            <BreedExploreModal breedId={params.id as AvailableBreedsEnumType} />
          )}
        </Route>
      </Route>

      <Route path="/favourites" component={FavouritesView} />
      <Route>
        <Redirect to="/cats" />
      </Route>
    </Switch>
  );
}
