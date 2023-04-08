import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";

import { api } from "~/utils/api";
import AlertModal from "~/components/modals/alert-modal";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const Categories: NextPage = () => {
  const [open, setOpen] = useState(false);
  const utils = api.useContext();
  const { data: categories } = api.category.getAll.useQuery();
  const { mutate: deleteCategory, isLoading: isDeleting } =
    api.category.delete.useMutation({
      onSuccess: async () => {
        setOpen(false);
        await utils.category.getAll.invalidate();
      },
    });

  const [toDeleteId, setToDeleteId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  if (!categories) return <div>Loading...</div>;

  const onDelete = () => {
    deleteCategory({ id: toDeleteId });
  };
  const headers = (
    <tr style={{ width: "10%" }}>
      <th>#</th>
      <th>Categoria</th>
      <th>Herramientas</th>
    </tr>
  );

  const filteredCategories = (name: string) => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(name.toLowerCase()),
    );
    return filtered.map((category, count) => (
      <tr key={category.id}>
        <td>{count + 1}</td>
        <td>{category.name}</td>
        <td>
          <CrudButtonGroup
            editHref={`/admin/category/edit/${category.id}`}
            onClickDelete={() => {
              setToDeleteId(category.id);
              setOpen(true);
            }}
          />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <AlertModal
        open={open}
        setOpen={setOpen}
        onConfirm={() => onDelete()}
        onCancel={() => setOpen(false)}
        title="Eliminar producto"
      />

      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span>Filtro:</span>
            <Input
              className="w-full"
              onChange={(name) => setCategoryName(name.currentTarget.value)}
            />
          </div>
          <Link href={"/admin/category/create"}>
            <Button style={{ width: "100%" }}>Create</Button>
          </Link>
          <div className="flex items-center justify-center">
            <table className="mt-4 w-full table-auto">
              <thead>{headers}</thead>
              <tbody>{filteredCategories(categoryName)}</tbody>
              <tfoot>{headers}</tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Categories;

type CrudButtonGroupProps = {
  editHref?: string;
  onClickEdit?: () => void;
  deleteHref?: string;
  onClickDelete?: () => void;
};
const CrudButtonGroup: React.FC<CrudButtonGroupProps> = ({
  deleteHref,
  onClickDelete,
  onClickEdit,
  editHref,
}) => {
  return (
    <div className="flex gap-1">
      <Link href={editHref || "#"} onClick={onClickEdit}>
        edit
      </Link>
      <Link href={deleteHref || "#"} onClick={onClickDelete}>
        delete
      </Link>
    </div>
  );
};
