import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const CreatePage = ({
  href = "/",
  textContent,
}: {
  href?: string;
  textContent?: string;
}) => {
  return (
    <Button
      showAnchorIcon
      as={Link}
      color="primary"
      href={href}
      variant="ghost"
      target="_blank"
    >
      {textContent || "Create your own page"}
    </Button>
  );
};

export default CreatePage;
