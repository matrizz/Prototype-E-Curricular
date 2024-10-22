import Image from 'next/image';

const colaboradores = [
  
  {
    nome: 'Robert Luiz Silva',
    cargo: 'Desenvolvedor Frontend',
    descricao: 'Focado no design e UI/UX do site.',
    foto: 'https://avatars.githubusercontent.com/u/95687945?s=400&u=33bd4202099a248310ddc15ecc1122bd1e462f50&v=4',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/prussianv',
  },
  {
    nome: 'Luiz Henrique Soares Gomes',
    cargo: 'Desenvolvedor Full-Stack',
    descricao: 'Idealizador e Líder de Desenvolvimento.',
    foto: 'https://firebasestorage.googleapis.com/v0/b/e-curricular.appspot.com/o/images%2Feu2.jpg?alt=media&token=023104b6-6e90-4b93-ac79-17ef76c215f1',
    linkedin: 'https://www.linkedin.com/in/DevLuizHS',
    github: 'https://github.com/matrizz',
  },
  {
    nome: 'Vitor Brito Alves de Souza',
    cargo: 'Desenvolvedor Backend',
    descricao: 'Focado no banco de dados.',
    foto: 'https://avatars.githubusercontent.com/u/95687945?s=400&u=33bd4202099a248310ddc15ecc1122bd1e462f50&v=4',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/prussianv',
  },
  {
    nome: 'Rafael Miranda',
    cargo: 'Desenvolvedor Frontend',
    descricao: 'Focado no design do site.',
    foto: 'https://avatars.githubusercontent.com/u/95687945?s=400&u=33bd4202099a248310ddc15ecc1122bd1e462f50&v=4',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/prussianv',
  },
  {
    nome: 'Gabriel Mastrorosa Silva Romão',
    cargo: 'Gerente de Projetos',
    descricao: 'Responsável pela coordenação entre a equipe de desenvolvimento e os clientes.',
    foto: 'https://avatars.githubusercontent.com/u/95687945?s=400&u=33bd4202099a248310ddc15ecc1122bd1e462f50&v=4',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/prussianv',
  },
  {
    nome: 'Nicolas Sardinha Muniz',
    cargo: 'Desenvolvedor Frontend',
    descricao: 'Focado no UI/UX do site.',
    foto: 'https://avatars.githubusercontent.com/u/95687945?s=400&u=33bd4202099a248310ddc15ecc1122bd1e462f50&v=4',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/prussianv',
  },
  {
    nome: 'Gabriela Schimit',
    cargo: 'Desenvolvedor Frontend',
    descricao: 'Focado no UI/UX do site.',
    foto: 'https://avatars.githubusercontent.com/u/95687945?s=400&u=33bd4202099a248310ddc15ecc1122bd1e462f50&v=4',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/prussianv',
  },
  {
    nome: 'Henri Lidney',
    cargo: 'Desenvolvedor Frontend',
    descricao: 'Focado no UI/UX do site.',
    foto: 'https://avatars.githubusercontent.com/u/95687945?s=400&u=33bd4202099a248310ddc15ecc1122bd1e462f50&v=4',
    linkedin: 'https://linkedin.com/in/maria',
    github: 'https://github.com/prussianv',
  },

  // Adicione mais colaboradores conforme necessário
];

export default function Colaboradores() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl my-6 font-bold">Colaboradores</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {colaboradores.map((colaborador, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={colaborador.foto}
              alt={`Foto de ${colaborador.nome}`}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{colaborador.nome}</h2>
            <p className="text-center text-gray-500">{colaborador.cargo}</p>
            <p className="mt-2 text-center text-gray-700">{colaborador.descricao}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href={colaborador.linkedin} target="_blank" rel="noopener noreferrer">
                <img src="/linkedIn.svg" alt="LinkedIn" className="h-6 w-6" />
              </a>
              <a href={colaborador.github} target="_blank" rel="noopener noreferrer">
                <img src="/github.svg" alt="GitHub" className="h-6 w-6" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
