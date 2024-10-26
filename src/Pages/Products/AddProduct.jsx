import Input from "../../components/Input";
import "./Product.scss";
const AddProduct = () => {
  return (
    <div className="add-products">
      <section className="py-10">
        <div className="container mx-auto">
          <div className="row my-0 mx-auto p-5 add-product-form">
            <div className="col-md-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-5">
                Add Products
              </h1>
            </div>
            <form>
              <div className="mb-6">
                <Input
                  type="text"
                  name="Title"
                  id="username"
                  placeholder="Enter Title"
                />
              </div>
              <div className="mb-5">
                <Input
                  type="file"
                  name="Title"
                  id="image"
                  placeholder="Enter Title"
                />
              </div>
              <div className="mb-5">
                <Input
                  type="text"
                  name="location"
                  id="username"
                  placeholder="Enter Location"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <select className="block w-full px-3 py-2 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 h-48 focus:border-blue-500 sm:text-sm">
                    <option value="option1">Country</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <select className="block w-full px-3 py-2 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 h-48 focus:border-blue-500 sm:text-sm">
                    <option value="option1">State</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div>
                  <Input
                    type="number"
                    name="pincode"
                    placeholder="Enter Pincode"
                  />
                </div>
              </div>
              <div className="mb-5">
                <Input
                  type="number"
                  name="ex_showroom_price"
                  placeholder="Showroom Price"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AddProduct;
