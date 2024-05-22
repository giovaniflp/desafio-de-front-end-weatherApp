"use client"
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
      <header><h1 className="font-light text-5xl">Weather</h1></header>
      <h2 className="font-thin text-2xl">Select a city</h2>
      <Image className="my-10" alt="" src={"/world.png"} width={100} height={100}></Image>
      <section className="grid grid-cols-3 gap-5">
        <Link className="font-light text-xl" href={"/dallol"}>Dallol</Link>
        <Link className="font-light text-xl" href={"/fairbanks"}>Fairbanks</Link>
        <Link className="font-light text-xl" href={"/londres"}>London</Link>
        <Link className="font-light text-xl" href={"/recife"}>Recife</Link>
        <Link className="font-light text-xl" href={"/vancouver"}>Vancouver</Link>
        <Link className="font-light text-xl" href={"/yakutsk"}>Yakutsk</Link>
      </section>
    </div>
  );

}
