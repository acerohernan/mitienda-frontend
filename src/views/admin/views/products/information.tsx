import { useRouter } from "next/router";
import { API } from "../../../../api";
import { getHttpError } from "../../../../helpers/httpError";
import { useToast } from "../../../../hooks/useToast";
import AdminProductForm from "./components/form";
import { IProduct } from "./context/types";

interface Props {
  product: IProduct;
}

const AdminProductInformationView: React.FC<Props> = ({ product }) => {
  const toast = useToast();
  const { push } = useRouter();

  async function updateProduct(form: IProduct) {
    try {
      /* Send to the api */
      await API.product.updateProduct(product.id, form);
      toast.success("Producto actualizado correctamente");
      push("/admin/products");
    } catch (err) {
      toast.error(getHttpError(err));
    }
  }

  return <AdminProductForm product={product} onSave={updateProduct} />;
};

export default AdminProductInformationView;
