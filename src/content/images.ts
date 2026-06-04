/**
 * Central registry of remote image assets used across the site.
 * Swapping a photo is a one-line change here; content files reference by key.
 */
const A = "https://cdn.prod.website-files.com/686a42bf95a654b62506d2e5";
const B = "https://cdn.prod.website-files.com/68a4278857230972a435a779";

export const img = {
  // Programme & impact photography
  foodDistribution: `${B}/690d864a52d8c2c094da4929_food-distribution.jpg`,
  treePlantation: `${B}/690d826a71754ee656cbb55b_Tree%20Plantation.jpg`,
  communities: `${B}/690d83476f395330a68fa347_communties.jpg`,
  bloodDonation: `${B}/690d84335759ed100fe505cd_Blood%20donation.jpg`,
  blogSlider: `${B}/690d7fe10b3f8f24a8e72b11_blog-slider1.jpg`,
  planting: `${A}/68d7a1e38dbb4dd69e484bbe_planting-im2.avif`,
  topImg: `${A}/68c7d772d173370d30b7c2b5_top-img.avif`,

  // Seeds / programmes
  liftingLives: `${A}/691163126cbdfb4118853371_lifting-lives1.avif`,
  freedomThrive: `${A}/69116325dbe8945ec9efe856_freedom-thrive1.avif`,
  climateChampions: `${A}/69116332bec5818fa86ad9cd_climate-champions1.avif`,
  educationImg: `${A}/6911634a20de4e6f3f16bec1_education-img1.avif`,
  careAction: `${A}/69116356b7f0575f57b46b3e_care-action1.avif`,
  waterLife: `${A}/68c8f1a2c3fddb827929e29f_water-life.avif`,
  strongerTogether: `${A}/6911636dff647ba5920e7b60_stronger-together1.avif`,

  // People
  ekta: `${A}/68c7e89871f37f8ab366a258_testimonial-img1.avif`,
  rakesh: `${A}/68c7e8985521e89cbf8c2b3b_testimonial-img2.avif`,
  sonika: `${A}/68c7e8988331b1ecd6744665_testimonial-img3.avif`,
  gisha: `${A}/690f18f4830dadb7dacc7b2e_testimonial-img4.avif`,
  neha: `${A}/690f18f4b92b5d5b9817e3ba_testimonial-img5.avif`,
  swarali: `${A}/6989c35443515f426cd79c0e_testimonial-img7.jpg`,

  // Heroes & banners
  aboutImg: `${A}/69170859f076ab9180ad76d3_about-img1.avif`,
  seedsTop: `${A}/68d7a3aa6ce93d62427c7456_seeds-top1.avif`,
  seedsCta: `${A}/689b20132546740be8affa12_seeds-cta.avif`,
  blogBanner: `${A}/68c9029a313ecaecec8328e0_blog-banner.avif`,
  eduPath: `${B}/69b144013a24de5114f40b76_eduPath-blog.jpg`,
  mediaTop: `${A}/68c8f3da4eaf2c07dd2cef34_media-top.avif`,

  // Partner logos
  partnerVenus: `${A}/689add498b551ad5eaaafb7c_venus-logo.avif`,
  partnerReset: `${A}/689add3db391444ed29b771d_reset-logo.avif`,
  partnerSterloc: `${A}/689add3d4f771f77b3d6012d_sterloc-logo.avif`,
  partnerIndia: `${A}/689add3d5564840e4396d087_india-sterlocked.avif`,
} as const;
