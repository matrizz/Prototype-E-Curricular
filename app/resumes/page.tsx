import { Container } from "@mui/joy";
import { ResumeCard } from "../components/resumeCard";
import Card from "../components/card";

export default function Resumes() {
  return (
    <Container>
      <h1>Resumes</h1>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {api.resumes.map((resume, index) => (
        //   <ResumeCard key={resume.name} {...resume} />
        <Card key={index} {...resume} />
        ))}
      </section>
    </Container>
  );
}

const api = {
  resumes: [
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
    {
      name: "Resume",
      description: "Resume description",
      url: "https://example.com/resume.pdf",
      student: "John Doe",
      birth: "01/01/2000",
      image: "https://cdn1.iconfinder.com/data/icons/online-money/80/onlinemoney-12-512.png",
    },
  ],
};
