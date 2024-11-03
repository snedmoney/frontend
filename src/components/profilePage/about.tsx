type AboutProps = {
  about?: string;
};

const About = ({ about }: AboutProps) => {
  return (
    <div className="text-sm space-y-4 text-default-600 md:text-md">
      {about && about}
      {!about && "Currently there's no description about this user :("}
    </div>
  );
};

export default About;
