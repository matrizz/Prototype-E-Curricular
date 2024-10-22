import { useRouter } from "next/navigation";

interface CardInfoProps {
  id: string
  img: string
  name: string
  course: string
  born: string
  description: string
}


export default function Card(props: CardInfoProps) {
  const router = useRouter()

  function abreviarPenultimoNome(nomeCompleto: string): string {
    const nomes = nomeCompleto.trim().split(" ");
    const totalNomes = nomes.length;

    if (totalNomes > 2) {
      // Abrevia o penúltimo nome
      nomes[totalNomes - 2] = nomes[totalNomes - 2].charAt(0) + ".";
    }

    return nomes.join(" ");
  }

  return (
    <div onClick={() => router.push(`/resumes/myresume/${props.id}`)} id={props.id} className="max-h-[120px] h-[120px] border rounded drop-shadow-md hover:drop-shadow-lg border-slate-300 flex flex-1 transition-transform duration-500 cursor-pointer ease-in-out hover:scale-105">
      <div className="w-[118px] h-[118px] rounded-l">
        <img className="w-[118px] h-[118px] rounded-l" src={props.img} alt="foto do curriculo" />
      </div>

      <div className="flex px-2 py-3 gap-2 flex-1 flex-col ">
        <p className="text-lg font-semibold">{props.name.length >= 25 ? abreviarPenultimoNome(props.name) : props.name}</p>
        <p className="text-xs font-semibold">{props.course}</p>
        <span className="hidden text-xs md:visible">{props.born}</span>
      </div>
    </div>
  );
}
