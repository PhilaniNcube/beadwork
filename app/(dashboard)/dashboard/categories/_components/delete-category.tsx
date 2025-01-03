import { useActionState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { deleteCategoryAction } from "@/utils/actions/categories";
import { Trash, Trash2 } from "lucide-react";

const DeleteCategory = ({ id }: { id: number }) => {
  const [state, formAction] = useActionState(deleteCategoryAction, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton type="submit" className="text-white bg-red-700 rounded-none" >
        <Trash2 className="w-4 h-4" />
      </SubmitButton>
    </form>
  );
};
export default DeleteCategory;
