import {useState} from 'react'
import Navbar from '../components/Navbar'
import {Plus, Minus, Star, Eye} from 'lucide-react'
import type { ProductReview } from '../models/ProductReview'
import type { SimilarProduct } from '../models/SimilarProduct'

const Product = () => {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [selectedTraits, setSelectedTraits] = useState<Partial<Record<keyof typeof product.traits, string>>>({});
    const [quantity, setQuantity] = useState<number>(0);
    const product = { 
        name: "Sunglasses", 
        img: [
            "https://picsum.photos/200?random=1",
            "https://picsum.photos/200?random=2",
            "https://picsum.photos/200?random=3",
            "https://picsum.photos/200?random=4",
        ], 
        store: "Executive Optical",
        price: "Php 200.00",
        traits: {colors: ["White", "Black", "Blue", "Red"], sizes: ["100", "200", "300"]}, 
        originalPrice: "Php 250.00",
        discount: "25%"
    };
    const productReviews: ProductReview[] = [
        {
            name: "John D.",
            review: "Great quality! The frame feels sturdy and the lenses are very clear. Worth the price.",
            images: ["https://picsum.photos/200?random=101"],
            time: "2 days ago",
            stars: 5,
        },
        {
            name: "Maria P.",
            review: "Arrived on time and looks exactly like the photo. Slightly tight fit though.",
            images: ["https://picsum.photos/200?random=102"],
            time: "1 week ago",
            stars: 4,
        },
        {
            name: "Alex R.",
            review: "Not bad for casual use. The color is vibrant but the case could be better.",
            images: [],
            time: "3 days ago",
            stars: 4,
        },
        {
            name: "Ella G.",
            review: "Love the design! Very lightweight and comfortable to wear all day.",
            images: ["https://picsum.photos/200?random=103", "https://picsum.photos/200?random=104"],
            time: "5 days ago",
            stars: 5,
        },
        {
            name: "Carl S.",
            review: "It’s okay, but I received a slightly scratched lens. Customer service replaced it fast though.",
            images: ["https://picsum.photos/200?random=105"],
            time: "1 week ago",
            stars: 3,
        },
        {
            name: "Hannah L.",
            review: "I’ve been using this daily for driving. The anti-glare works perfectly!",
            images: [],
            time: "3 weeks ago",
            stars: 5,
        },
        {
            name: "Paul T.",
            review: "Feels a bit cheap for the price. The hinges loosen after a week of use.",
            images: ["https://picsum.photos/200?random=106"],
            time: "2 weeks ago",
            stars: 2,
        },
        {
            name: "Jenny V.",
            review: "Perfect fit and stylish! My friends keep asking where I got it.",
            images: ["https://picsum.photos/200?random=107"],
            time: "4 days ago",
            stars: 5,
        },
        {
            name: "Mike C.",
            review: "Good value for money. The lens tint is just right for sunny days.",
            images: ["https://picsum.photos/200?random=108"],
            time: "6 days ago",
            stars: 4,
        },
        {
            name: "Sophia R.",
            review: "Packaging was nice. No defects. Would definitely order again.",
            images: ["https://picsum.photos/200?random=109"],
            time: "1 month ago",
            stars: 5,
        },
    ];
    const similarProducts: SimilarProduct[] = [
    {
        name: "Aviator Sunglasses",
        store: "RayWear",
        img: "https://picsum.photos/200?random=201",
        price: "₱450.00",
    },
    {
        name: "Blue Light Glasses",
        store: "LensCrafters",
        img: "https://picsum.photos/200?random=202",
        price: "₱399.00",
    },
    {
        name: "Polarized Sports Shades",
        store: "SunGuard",
        img: "https://picsum.photos/200?random=203",
        price: "₱520.00",
    },
    {
        name: "Matte Black Eyewear",
        store: "VisionX",
        img: "https://picsum.photos/200?random=204",
        price: "₱350.00",
    },
    {
        name: "Retro Round Sunglasses",
        store: "VintageVue",
        img: "https://picsum.photos/200?random=205",
        price: "₱480.00",
    },
    {
        name: "Clear Frame Glasses",
        store: "SpecSpot",
        img: "https://picsum.photos/200?random=206",
        price: "₱310.00",
    },
    {
        name: "Foldable Travel Shades",
        store: "Foldy",
        img: "https://picsum.photos/200?random=207",
        price: "₱420.00",
    },
    {
        name: "UV400 Sports Goggles",
        store: "ActiveEyes",
        img: "https://picsum.photos/200?random=208",
        price: "₱620.00",
    },
    {
        name: "Mirrored Street Shades",
        store: "UrbanLook",
        img: "https://picsum.photos/200?random=209",
        price: "₱540.00",
    },
    {
        name: "Round Tinted Frames",
        store: "ClearView",
        img: "https://picsum.photos/200?random=210",
        price: "₱370.00",
    },
    ];

    const traits = Object.keys(product.traits) as Array<keyof typeof product.traits>;
    return (
        <div className="bg-slate-950 text-white">
            <Navbar />
            <div className='flex flex-col px-20'>
                {/* Product Details */}
                <div className='flex gap-x-5'>
                    <div className='flex flex-col w-1/2 ml-5 my-10'>
                        <img className="w-full h-2/3 rounded-lg border-4 border-slate-700" src={product.img[imageIndex]} alt="" />
                        <div className='flex h-[80px] border my-3 rounded-lg gap-x-1 p-1 w-fit self-center'>
                            {product.img.map((image, index) => {
                                return <img 
                                    src={image} 
                                    alt="" 
                                    className={`h-[70px] rounded-md ${index === imageIndex ? "border-2 border-blue-500": ""}`}
                                    onClick={() => setImageIndex(index)}
                                />
                            })}
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 mr-5 my-10 h-[400px]'>
                        <span className='flex h-fit items-center gap-x-3'>
                            <span className='text-blue-400 font-bold text-3xl'>
                                {product.name}
                            </span>
                            <span className='flex items'>
                                {[1,2,3,4,5].map((item) => <Star size={20} color='white'/>)}
                            </span>
                        </span>
                        {/* Store Name */}
                        <div className='flex text-sm mt-2 cursor-pointer'>
                            <span className='text-start text-black bg-gray-200 px-2 px-1 rounded-l-md'>
                                {product.store}
                            </span>
                            <button className='px-2 bg-gray-800 rounded-r-md'>
                                <Eye size={15}/>
                            </button>
                        </div>
                        <div className='flex items-center gap-x-5'>
                            <span className='text-start text-4xl py-4 font-bold text-white'>
                                {product.price}
                            </span>
                            {product.discount && <span className='text-xl line-through text-red-300'>
                                {product.originalPrice}
                            </span>}
                        </div>
                        <div className='border-t pt-4 text-justify'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ex quod voluptatem quibusdam rem eius. Assumenda porro eius totam voluptates, quidem maxime unde similique laudantium rerum cum rem laborum eaque?
                            Suscipit rerum perferendis dolores nemo aspernatur iure molestiae temporibus, dolor exercitationem illo saepe in vel, cum laborum et qui obcaecati maiores possimus? Nesciunt, necessitatibus ut quae similique veritatis excepturi iste.
                        </div>
                        <div className="flex flex-col mt-6">
                            {/* Section Header */}
                            <h2 className="text-lg font-bold text-gray-200 mb-4 border-b pb-2">
                                Traits
                            </h2>
                            {traits.map((trait) => (
                                <div
                                key={trait}
                                className="flex flex-col sm:flex-row sm:items-center text-start mb-5"
                                >
                                    <p className="font-semibold capitalize text-gray-200 w-28 mb-2 sm:mb-0">
                                        {trait}:
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {product.traits[trait].map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedTraits((prev) => ({...prev, [trait]: item}))}
                                            className={`px-3 py-1 border border-gray-300 rounded-full text-sm text-gray-200 
                                            cursor-pointer hover:bg-slate-800 hover:border-blue-400 transition-all duration-200 
                                            ${selectedTraits[trait] === item ? "bg-gray-200 text-blue-700 font-bold transition hover:bg-gray-300 hover:border-blue-500" : ""}`}
                                        >
                                            {item}
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {/* Quantity Selector and Add to Cart/Wishlist Buttons */}
                            <div className='flex mt-2 gap-x-5'>
                                <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
                                <div className='flex w-full gap-x-5'>
                                    <button className='px-2 py-1 border rounded-md w-1/2 text-blue-700 font-bold 
                                        shadow-md bg-slate-200 hover:bg-slate-300'>
                                        Add to Cart
                                    </button>
                                    <button className='px-2 py-1 border rounded-md w-1/2 text-blue-700 font-bold 
                                        shadow-md bg-slate-200 hover:bg-slate-300'>
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                            
                            </div>
                    </div>
                    
                </div>

                
                <div className='flex py-5 rounded-lg gap-x-5'>
                    {/* Product Reviews */}
                    <ProductReviews productReviews={productReviews}/>
                    <SimilarProducts similarProducts={similarProducts}/>
                </div>
            </div>
        </div>
  )
}

const QuantitySelector = ({quantity, setQuantity} : {quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>}) => {
    const increment = () => setQuantity(quantity + 1);
    const decrement = () => setQuantity(quantity !== 0 ? quantity - 1 : 0);

    return <div className="flex items-center justify-between border-gray-300 rounded-lg w-fit shadow-sm">
        <span className="text-lg font-semibold text-gray-200 mr-3">Quantity</span>

        <div className="flex items-center gap-3">
            <button className="p-2 rounded-full border border-gray-300 group hover:bg-gray-100 transition" onClick={decrement}>
            <Minus className="w-4 h-4 text-gray-200 group-hover:text-gray-900 transition" />
            </button>

            <span className="w-10 text-center text-gray-200 font-medium select-none border border-gray-200 rounded-md py-1">
                {quantity}
            </span>

            <button className="p-2 rounded-full border border-gray-300 group hover:bg-gray-100 transition" onClick={increment}>
            <Plus className="w-4 h-4 text-gray-200 group-hover:text-gray-900 transition" />
            </button>
        </div>
        </div>
}

const ProductReviews = ({productReviews} : {productReviews: ProductReview[] }) => {
  return (
    <div className="items-start h-fit border border-gray-300 rounded-lg w-2/3 p-4 shadow-sm">
      <h2 className="font-bold text-xl mb-4 text-gray-100">Product Reviews</h2>

      <div className="flex flex-col gap-4">
        {productReviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col border-b border-gray-200 pb-3 last:border-b-0"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-100">{review.name}</span>
              <span className="text-sm text-gray-400">{review.time.toString()}</span>
            </div>

            {/* Star rating */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < review.stars ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`w-4 h-4 ${
                    i < review.stars ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.06 4.172a.562.562 0 00.423.307l4.6.67a.562.562 0 01.312.958l-3.326 3.243a.562.562 0 00-.162.497l.785 4.58a.562.562 0 01-.815.592l-4.115-2.164a.562.562 0 00-.523 0l-4.115 2.164a.562.562 0 01-.815-.592l.785-4.58a.562.562 0 00-.162-.497L4.085 9.606a.562.562 0 01.312-.958l4.6-.67a.562.562 0 00.423-.307l2.06-4.172z"
                  />
                </svg>
              ))}
            </div>

            <p className="text-gray-100 text-sm mb-2 text-justify">{review.review}</p>

            {/* Review images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-2">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Review"
                    className="w-20 h-20 object-cover rounded-md border border-gray-200 hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SimilarProducts = ({similarProducts} : {similarProducts: SimilarProduct[]}) => {
    return (
        <div className="w-1/3 h-fit sticky self-start border border-gray-300 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-100">
            Similar Products
            </h2>

            <div className="flex flex-col gap-3">
            {similarProducts.slice(0, 10).map((product, index) => (
                <div
                key={index}
                className="flex items-center gap-3 border border-gray-200 rounded-md p-2 hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                >
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-100 text-sm">
                    {product.name}
                    </span>
                    <span className="text-gray-100 text-start text-xs">{product.store}</span>
                    <span className="text-blue-500 text-start font-bold text-sm">
                    {product.price}
                    </span>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}


export default Product