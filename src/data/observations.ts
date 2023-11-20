import {Observation} from "../js/types"

const observations: Array<Observation> = [
  {
    id: "o1",
    name: "Observation 1",
    videoUrl:
      "https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.mp4",
    webSocketUrl: "wss://ttchatsocket.lumi.systems:443/",
    annotationsUrl:
      "https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.json",
  },
  {
    id: "o2",
    name: "Observation 2",
    videoUrl:
      "https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.mp4",
    webSocketUrl: "wss://ttchatsocket.lumi.systems:443/",
    annotationsUrl: "https://burt202.github.io/reach/o2-annotations.json",
  },
  {
    id: "o3",
    name: "Observation 3",
    videoUrl:
      "https://reach-industries-candidate-tests.s3.eu-west-2.amazonaws.com/FrontendCandidateTest-FINAL.mp4",
    webSocketUrl: "wss://ttchatsocket.lumi.systems:443/",
    annotationsUrl: "https://burt202.github.io/reach/o3-annotations.json",
  },
]

export default observations
