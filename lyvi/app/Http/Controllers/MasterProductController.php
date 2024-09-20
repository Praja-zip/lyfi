<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Master_product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MasterProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('admin.auth')->only(['store', 'update', 'destroy']);
    }
    public function index(Request $request)
{
    // Menentukan jumlah item per halaman, defaultnya 10 jika tidak ada parameter 'per_page'
    $perPage = $request->get('per_page', 10);

    // Mengambil data produk dengan relasi kategori yang terhubung, menggunakan eager loading
    $master_products = Master_product::with('kategoris')->paginate($perPage);

    // Mengembalikan respon JSON dengan data produk beserta kategori yang terkait
    return response()->json([
        'data' => $master_products->map(function ($product) {
            return [
                'nama_produk' => $product->nama_produk,
                'harga_produk' => $product->harga_produk,
                'foto_produk' => $product->foto_produk,
                'detail_produk' => $product->detail_produk,
                'kategori' => $product->kategoris->map(function ($kategori) {
                    return $kategori->nama_kategori;
                }),
            ];
        }),
        'current_page' => $master_products->currentPage(),
        'last_page' => $master_products->lastPage(),
        'total' => $master_products->total(),
        'per_page' => $master_products->perPage(),
    ]);
}



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $validator = Validator::make($request->all(), [
            'nama_produk' => 'required|string|max:255',
            'harga_produk' => 'required|numeric',
            'detail_produk' => 'required|string',
            'foto_produk' => 'required|file|mimes:jpg,jpeg,png',
            'bahan_produk' => 'required|string',
            'cara_pemakaian' => 'required|string',
            'kategori' => 'required|array',
            'kategori.*' => 'exists:kategoris,id',
            'redirect' => 'required|url'
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Extract all except 'kategori'
        $input = $request->except('kategori');
    
        // Handle file upload
        if ($request->hasFile('foto_produk')) {
            $gambar = $request->file('foto_produk');
            $nama_gambar = time() . rand(1, 9) . '.' . $gambar->getClientOriginalExtension();
            
            // Store the file in 'storage/app/public/images'
            Storage::disk('public')->put('images/' . $nama_gambar, file_get_contents($gambar));
            
            // Save the relative path to the database
            $input['foto_produk'] = 'storage/images/' . $nama_gambar;
        }
    
        // Create the product
        $master_product = Master_product::create($input);
    
        // Attach categories using the pivot table
        $master_product->kategoris()->attach($request->input('kategori'));
    
        return response()->json([
            'data' => $master_product->load('kategoris')
        ], 201);
}
}