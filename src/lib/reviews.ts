// Real Google reviews of Selah, as shown by the review widget on the live homepage.
// Text is verbatim. Long reviews are cut to whole sentences (nothing reworded, nothing added).
// Oct 15, 2026 reviews: from Saba's screenshot of the live widget (2026-11-18).
// Apr/May 2026 reviews: from the live homepage as archived in June 2026.
export type Review = { name: string; date: string; text: string }

export const reviews: Review[] = [
  {
    name: "Andrew M",
    date: "October 15, 2026",
    text: "Josh with the mobile coffee cart made the best latte I’ve had! He was so pleasant and polite! Would recommend.",
  },
  {
    name: "Kelly L",
    date: "October 15, 2026",
    text: "Josh ran the coffee cart at our company event today and he was excellent.",
  },
  {
    name: "Kathryn N",
    date: "May 1, 2026",
    text: "We loved having them come to our school and can’t wait for our future events with Selah! They made our teachers’ days!",
  },
  {
    name: "Julie C",
    date: "October 15, 2026",
    text: "Just got a coffee from Josh at the coffee cart. Not only was the quality good but he handled a long line very well.",
  },
  {
    name: "Rhiannon R",
    date: "April 29, 2026",
    text: "My workplace has booked Selah’s mobile coffee cart three times, and they never disappoint!",
  },
  {
    name: "Christopher V",
    date: "October 15, 2026",
    text: "Thanks to Josh for kick starting our morning!",
  },
  {
    name: "Catherine T",
    date: "April 29, 2026",
    text: "Everyone who represented the company had a smile on their face and were genuinely excited to be here. We would love to work with them again!",
  },
  {
    name: "Nichole R",
    date: "April 29, 2026",
    text: "What an amazing treat and lovely in-office experience to kick off the day during a rough week.",
  },
]
