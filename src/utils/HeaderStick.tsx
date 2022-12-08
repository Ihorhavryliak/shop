import { useEffect } from "react";
import { Header } from "../components";

export const HeaderStick = () => {
  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e: any) => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    if (header !== null) {
      scrollTop >= 0
        ? header.classList.add("is-sticky")
        : header.classList.remove("is-sticky");
    }
  };
  return (
    <>
      <header className="is-sticky">
        <Header />
      </header>
    </>
  );
};
