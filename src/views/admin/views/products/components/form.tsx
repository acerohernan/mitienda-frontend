import React from "react";
import { IProduct } from "../context/types";

import { nanoid } from "nanoid";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProductForm } from "../../../../../api/product/types";
import ImageInput from "../../../../../components/form/image";
import Select from "../../../../../components/form/select";
import TextInput from "../../../../../components/form/text";
import useTranslation from "../../../../../i18n/useTranslation";
import VariantCard from "../components/variant/card";
import { IProductVariant } from "../context/types";
import ProductVariantModal from "./variant/modal";

interface Props {
  product: IProduct;
}

const AdminProductForm: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [variants, setVariants] = useState<Record<string, IProductVariant>>(
    () => {
      let state: Record<string, IProductVariant> = {};

      product.variants.forEach((variant) => {
        const id = nanoid();
        state[id] = variant;
      });

      return state;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductForm>();

  async function onSubmit(data: CreateProductForm) {
    data.category_id = null;
    console.log(data);
  }

  function handleAddVariant(variant: IProductVariant) {
    const id = nanoid();
    setVariants({ ...variants, [id]: variant });
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className={openModal ? "hide-page" : ""}>
      <div>
        <span className="font-medium text-2xl dark:text-white">
          {t("Products")}
        </span>
        <div className="flex items-center gap-5 mt-3">
          <Link
            href="/admin"
            className="text-sm dark:text-white hover:underline"
          >
            {t("Administrator")}
          </Link>
          <div className="w-1 h-1 bg-slate-400 dark:bg-slate-50 rounded-full" />
          <span className="text-sm dark:text-white">{t("Products")}</span>
          <div className="w-1 h-1 bg-slate-400 dark:bg-slate-50 rounded-full" />
          <span className="text-sm text-slate-400">{"Create"}</span>
        </div>
      </div>
      <form
        className="card w-full mt-4 lg:mt-14 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="label block">Foto de su producto</label>
        <ImageInput
          id="product"
          className="mt-2 h-52 w-52"
          rounded="rounded-lg"
          onChange={(file) => {}}
        />
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <TextInput
            full
            label="Name"
            inputProps={{
              placeholder: "Test Product",
              ...register("name", {
                required: t("This field is required"),
                value: product.name,
              }),
            }}
            error={errors.name?.message}
          />
          <TextInput
            full
            label="SKU"
            optional
            inputProps={{
              placeholder: "010101",
              ...register("sku", {
                value: product.sku,
              }),
            }}
            error={errors.sku?.message}
          />
          <div className="lg:col-span-2">
            <TextInput
              full
              label="Description"
              textarea
              optional
              inputProps={{
                rows: 5,
                ...register("description", {
                  value: product.description,
                }),
              }}
              error={errors.description?.message}
            />
          </div>
          <TextInput
            full
            label="Full Price"
            inputProps={{
              placeholder: "8.00",
              ...register("price", {
                required: t("This field is required"),
                value: product.price,
              }),
            }}
            error={errors.price?.message}
          />
          <TextInput
            full
            label="Offer Price"
            inputProps={{
              placeholder: "7.00",
              ...register("offer_price", {
                required: t("This field is required"),
                value: product.offer_price,
              }),
            }}
            error={errors.offer_price?.message}
          />
          <TextInput
            full
            label="Stock"
            inputProps={{
              placeholder: "12",
              ...register("stock", {
                required: t("This field is required"),
                value: product.stock,
              }),
            }}
            error={errors.stock?.message}
          />
          <div>
            <label className="block mb-2 label">Category</label>
            <Select
              onChange={(opt) => {}}
              items={[
                {
                  value: "Category1",
                  component: <>Category1</>,
                },
                {
                  value: "Category2",
                  component: <>Category2</>,
                },
              ]}
              className="input p-3 w-full"
              optionsContainerClassname="w-full"
            />
          </div>
          <div className="lg:col-span-2 mt-4">
            <span className="label block mb-2">Variantes</span>
            <div className="grid gap-6">
              {Object.values(variants).map((variant, i) => (
                <VariantCard variant={variant} key={i} />
              ))}
            </div>
            <button
              className="text-sm font-medium hover:underline text-purple-800 dark:text-purple-400 mt-2"
              type="button"
              onClick={handleOpenModal}
            >
              + Agregar variante
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="button text-sm" type="submit">
            {"Add Product"}
          </button>
        </div>
      </form>
      <ProductVariantModal
        open={openModal}
        handleClose={handleCloseModal}
        handleAddVariant={handleAddVariant}
        variant={{
          mandatory: true,
          name: "",
          options_to_choose: 1,
          options: [],
        }}
      />
    </div>
  );
};

export default AdminProductForm;