export const site = {
  name: "Sávio Pessôa",
  fullName: "Sávio Pessôa Afonso",
  title: "Especialista E-commerce VTEX e Wake",
  url: "https://savioomiodev.com.br",
  email: "saviopessoaafonso@gmail.com",
  github: "https://github.com/savioomio",
  githubUser: "savioomio",
  linkedin: "https://www.linkedin.com/in/savioomio/",
  instagram: "https://instagram.com/savioomio",
  whatsappLabel: "(77) 99196-6527",
  whatsapp: "https://wa.me/5577991966527?text=Ol%C3%A1%20S%C3%A1vio!%20Vi%20seu%20portf%C3%B3lio.",
};

const counts = __STORE_COUNTS__;
const vtex = counts.faststore + counts.storeFramework;

/** Vem do banco no build (ADR 0015), então o número sai pronto no HTML. */
export const stores = { ...counts, vtex, total: vtex + counts.wake };
