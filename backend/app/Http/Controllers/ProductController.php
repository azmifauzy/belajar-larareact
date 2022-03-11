<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        $products = Product::all();
        return $products;
    }

    public function getProductById(Product $product)
    {
        return $product;
    }

    public function addProduct(Request $request)
    {
        date_default_timezone_set('Asia/Jakarta');
        $validateData = Validator::make($request->all(), [
            "title" => "required",
            "price" => "required|numeric"
        ]);


        if (!$validateData->fails()) {
            Product::create(["title" => $request->title, "price" => $request->price]);
            return response()->json([
                "status" => 200,
                "message" => "New Product has been Added"
            ]);
        } else {
            return response()->json([
                "validate_err" => $validateData->messages()
            ]);
        }
    }

    public function updateProduct(Product $product, Request $request)
    {
        date_default_timezone_set('Asia/Jakarta');
        $validateData = Validator::make($request->all(), [
            "title" => "required",
            "price" => "required|numeric"
        ]);

        if (!$validateData->fails()) {
            $product->update(["title" => $request->title, "price" => $request->price]);
            return response()->json([
                "status" => 200,
                "message" => "Product has been Updated"
            ]);
        } else {
            return response()->json([
                "validate_err" => $validateData->messages()
            ]);
        }
    }

    public function destroyProduct(Product $product)
    {
        $dataProduct = Product::where('id', $product->id)->first();
        if ($dataProduct) {
            Product::destroy('id', $product->id);
            return response()->json([
                "status" => 200,
                "message" => "Product has been Deleted"
            ]);
        }
    }
}
