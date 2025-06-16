"use client";

import { useState } from "react";
import Image from "next/image";
import { AppleIcon, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import Faq02 from "../kokonutui/faq-02";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

interface ProductDetailProps {
  product: Product;
}

export default function ProductD({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedThickness, setSelectedThickness] = useState(
    product.thicknessOptions && product.thicknessOptions.length > 0
      ? product.thicknessOptions[0].value
      : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions && product.colorOptions.length > 0
      ? product.colorOptions[0].value
      : ""
  );
  const [isToggled, setIsToggled] = useState(false);
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [image, setImage] = useState<File | null>(null);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const thicknessPriceModifier =
    product.thicknessOptions?.find((opt) => opt.value === selectedThickness)
      ?.priceModifier || 0;
  const colorPriceModifier =
    product.colorOptions?.find((opt) => opt.value === selectedColor)
      ?.priceModifier || 0;
  const finalPrice =
    product.price + thicknessPriceModifier + colorPriceModifier;

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative  rounded-lg overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  height={300}
                  width={400}
                  priority
                  className="object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative h-20 w-20 rounded overflow-hidden ring-offset-2 focus:outline-none focus:ring-2 focus:ring-primary transition",
                        selectedImage === index
                          ? "ring-2 ring-primary"
                          : "opacity-70 hover:opacity-100 border border-gray-300"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

              <div className="prose max-w-none mb-8">
                <p>{product.description}</p>
              </div>

              {product.thicknessOptions &&
                product.thicknessOptions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Thickness
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.thicknessOptions.map(({ value }, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedThickness(value)}
                          className={cn(
                            "px-3 py-1 rounded-full border text-sm",
                            selectedThickness === value
                              ? "bg-primary text-white border-primary"
                              : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                          )}
                          type="button"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              {product.colorOptions && product.colorOptions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colorOptions.map(({ value }, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(value)}
                        className={cn(
                          "px-3 py-1 rounded-full border text-sm",
                          selectedColor === value
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                        )}
                        type="button"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-3xl font-semibold text-primary mb-6">
                ₹{finalPrice.toFixed(2)}
              </p>

              {product.dimensions && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Dimensions
                  </h3>
                  <p className="text-gray-600">{product.dimensions}</p>
                </div>
              )}

              {/* Toggle Switch */}
              <div className="flex items-center mb-4">
                <label className="mr-2">Share Details Here:</label>
                <Switch
                  checked={isToggled}
                  onCheckedChange={handleToggleChange}
                  className="toggle-switch"
                />
              </div>

              {/* Message about sending details */}
              {isToggled && (
                <p className="text-gray-600 mb-4">
                  You can send photos, names, and the date later when our team contacts you on WhatsApp.
                </p>
              )}

              {/* Input Boxes */}
              {isToggled && (
                <div className="mb-4">
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Choose Date For Customization</label>
                    <Input
                      type="text"
                      value={inputValues[0]}
                      onChange={(e) => handleInputChange(0, e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="The Date Of The Wedding"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Name Of Boy*</label>
                    <Input
                      type="text"
                      value={inputValues[1]}
                      onChange={(e) => handleInputChange(1, e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="The Groom's Name"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Name Of Girl</label>
                    <Input
                      type="text"
                      value={inputValues[2]}
                      onChange={(e) => handleInputChange(2, e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="The Bride's Name"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Hashtag</label>
                    <Input
                      type="text"
                      value={inputValues[3]}
                      onChange={(e) => handleInputChange(3, e.target.value)}
                      className="border rounded p-2 w-full"
                      placeholder="The Wedding Hashtag"
                    />
                  </div>
                  <Input
                    type="file"
                    onChange={handleImageUpload}
                    className="border rounded p-2 mb-2 w-full"
                  />
                </div>
              )}

              {/* Conditional Rendering for WhatsApp Icon or Share Button */}
              {isToggled ? (
                <Button className="mb-5">
                  Customize It
                </Button>
              ) : (
                <a
                  href="https://wa.me/?text=Check%20out%20this%20product!"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mb-5">
                    Share Details On Whatsapp
                  </Button>
                </a>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center mb-8">
                <span className="text-gray-700 mr-4">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-md shadow-sm overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 border-r border-gray-300 text-gray-500 hover:bg-gray-100 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 border-l border-gray-300 text-gray-500 hover:bg-gray-100 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/80 transition-all duration-200"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        <Faq02 faqs={product.faqs || []} />
      </div>
    </>
  );
}
