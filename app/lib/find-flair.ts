import invariant from "tiny-invariant";
import data from "./flairdata";

export const DEFAULT_FLAIR = "/assets/calendar-flairs/default.jpg";

type CandidateScore = {
  flair: string;
  priority: number;
  length: number;
  index: number;
};

const findFlairName = (text: string) => {
  const candidates: CandidateScore[] = [];

  if (!(data && data[0] && data[0][0] === "flairdataaction.rsr")) {
    return undefined;
  }

  // find all matching flair candidates
  data[0][1].forEach(([flair, matchScores]) => {
    const matchScore = matchScores.find(([_, matcher]) => {
      return text.toLocaleLowerCase().indexOf(matcher) > -1;
    });
    if (matchScore) {
      const [priority, matcher] = matchScore;
      candidates.push({
        flair,
        priority,
        length: matcher.length,
        index: text.toLocaleLowerCase().indexOf(matcher),
      });
    }
  });

  if (candidates.length === 0) {
    return undefined;
  }

  // tie-break
  return candidates
    .sort((a, b) => b.priority - a.priority) // highest priorty
    .filter((candiate, _, array) => candiate.priority === array[0].priority)
    .sort((a, b) => b.length - a.length) // longest matcher length]
    .filter((candidate, _, array) => candidate.length === array[0].length)
    .sort((a, b) => a.index - b.index) // lowest index (starting point)
    .at(0)?.flair;
};

export const findFlair = (text: string) => {
  const flairName = findFlairName(text);
  if (!flairName) {
    return DEFAULT_FLAIR;
  }

  return `https://ssl.gstatic.com/tmly/f8944938hffheth4ew890ht4i8/flairs/xxhdpi/img_${flairName.trim()}.jpg`;
};
