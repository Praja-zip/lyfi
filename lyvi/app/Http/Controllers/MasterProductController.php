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
                'id' => $product->id,
                'nama_produk' => $product->nama_produk,
                'harga_produk' => $product->harga_produk,
                'foto_produk' => json_decode($product->foto_produk),
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

public function update(Request $request, $id)
{
    // Validasi input
    $validator = Validator::make($request->all(), [
        'nama_produk' => 'required|string|max:255',
        'harga_produk' => 'required|numeric',
        'detail_produk' => 'required|string',
        'foto_produk.*' => 'nullable|file', // Mendukung array file
        'bahan_produk' => 'required|string',
        'cara_pemakaian' => 'required|string',
        'kategori' => 'required|exists:kategoris,id', // Tidak lagi berupa array
        'redirect' => 'required|url'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $master_product = Master_product::findOrFail($id); 

    // Ambil semua input kecuali kategori
    $input = $request->except('kategori', 'foto_produk');

    // Proses setiap file gambar jika ada
    if ($request->hasFile('foto_produk')) {
        // Hapus gambar lama jika ada
        if ($master_product->foto_produk) {
            foreach (json_decode($master_product->foto_produk) as $oldImage) {
                if (Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        }

        // Simpan gambar baru
        $uploadedImages = [];
        foreach ($request->file('foto_produk') as $gambar) {
            $nama_gambar = time() . rand(1, 9) . '.' . $gambar->getClientOriginalExtension();
            Storage::disk('public')->put('images/' . $nama_gambar, file_get_contents($gambar));
            $uploadedImages[] = 'storage/images/' . $nama_gambar;
        }

        // Simpan nama file gambar baru sebagai array
        $input['foto_produk'] = json_encode($uploadedImages); // Simpan array gambar sebagai JSON
    }


    // Update data produk
    $master_product->update($input);

    // Sinkronisasi kategori
    $master_product->kategoris()->sync([$request->input('kategori')]);

    return response()->json([
        'message' => 'Product updated successfully!',
        'data' => $master_product->load('kategoris')
    ], 200);
}


// public function update(Request $request, $id)
// {
//     dd($request->all());  // Periksa data yang diterima backend
// }


public function show($id)
{
    try {
        $product = Master_product::findOrFail($id); // Menggunakan findOrFail untuk menangani ID yang tidak ditemukan
        return response()->json([
            'success' => true,
            'data' => $product,
            'kategori' => $product->kategoris->map(function ($kategori) {
                return $kategori->nama_kategori;
            }),
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Product not found',
        ], 404);
    }
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
    // Validasi input
    $validator = Validator::make($request->all(), [
        'nama_produk' => 'required|string|max:255',
        'harga_produk' => 'required|numeric',
        'detail_produk' => 'required|string',
        'foto_produk.*' => 'nullable|file',
        'bahan_produk' => 'required|string',
        'cara_pemakaian' => 'required|string',
        'kategori' => 'required|exists:kategoris,id',
        'redirect' => 'required|url'
    ]);

    // Jika validasi gagal, kembalikan error
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Ekstrak semua input kecuali 'kategori' dan 'foto_produk'
    $input = $request->except('kategori', 'foto_produk');

    // Proses file gambar jika ada
    if ($request->hasFile('foto_produk')) {
        // Simpan gambar baru
        $uploadedImages = [];
        foreach ($request->file('foto_produk') as $gambar) {
            $nama_gambar = time() . rand(1, 9) . '.' . $gambar->getClientOriginalExtension();
            Storage::disk('public')->put('images/' . $nama_gambar, file_get_contents($gambar));
            $uploadedImages[] = 'storage/images/' . $nama_gambar;
        }

        // Simpan nama file gambar baru sebagai array
        $input['foto_produk'] = json_encode($uploadedImages);
    }

    // Buat entri produk baru
    $master_product = Master_product::create($input);

    // Lampirkan kategori ke produk menggunakan tabel pivot
    $master_product->kategoris()->attach($request->input('kategori'));

    // Kembalikan respon sukses dengan data produk beserta kategori yang terhubung
    return response()->json([
        'data' => $master_product->load('kategoris') // Muat relasi kategori
    ], 201);
}

}