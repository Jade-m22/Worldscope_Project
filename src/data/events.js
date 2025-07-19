import mustVisit from "./must_visit";
import conflicts from "./conflicts";
import dangerous from "./dangerous";
import toAvoid from "./to_avoid";

// Si tu veux un seul tableau regroupant tout:
const events = [
  ...mustVisit,
  ...conflicts,
  ...dangerous,
  ...toAvoid
];

export default events;