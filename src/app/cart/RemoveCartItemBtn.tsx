"use client";
import { Button } from "_/components/ui/button";
import React, { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { removeCartItemAction } from "./cart.actions";
import { CartContext } from "../_Contexts/CartContext/CartContextProvider";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";

export default function RemoveCartItemBtn({ id }: { id: string }) {
  const { updateCartCount } = useContext(CartContext);

  async function handleRemoveCartItem() {
    const res = await removeCartItemAction(id); // will return number of cart items or null
    if (res) {
      updateCartCount(res);

      toast.success("Item Removed", {
        position: "top-right",
        duration: 2000,
        style: {
          "--normal-bg":
            "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
      });
    } else {
      toast.error("Error happened", {
        position: "top-right",
        duration: 2000,
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--destructive) 10%, var(--background))",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
      });
    }
  }

  return (
    <>
      {/* <PulseLoader color="#d5d5e8" size={10} /> */}
      <Button
        onClick={handleRemoveCartItem}
        variant={"ghost"}
        className="cursor-pointer  border-1 border-[#DADCE3] "
      >
        {" "}
        <FaRegTrashAlt /> Remove{" "}
      </Button>
    </>
  );
}
