<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KategoriController extends Controller
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
    
    public function index()
    {
        $kategori = Kategori::all();
 
        return response()->json([
            'kategoris' => $kategori
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
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
            'nama_kategori' => 'required',
        ]);
 
        if ($validator->fails()){
            return response()->json(
                [
                    'message' => 'kategori tidak berhasil ditambahkan',
                    $validator->errors(),
                422
                ]
            );
        };
 
        $input = $request->all();
       
        $kategori = Kategori::create($input);
 
        return response()->json([
            'data' => $kategori,
            'message' => 'kategori berhasil ditambahkan'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Kategori  $kategori
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $product = Kategori::findOrFail($id); // Menggunakan findOrFail untuk menangani ID yang tidak ditemukan
            return response()->json([
                'success' => true,
                'data' => $product,
                
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Kategori  $kategori
     * @return \Illuminate\Http\Response
     */
    public function edit(Kategori $kategori)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Kategori  $kategori
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
{
    // Validasi input
    $validator = Validator::make($request->all(), [
        'nama_kategori' => 'required',
    ]);

    // Jika validasi gagal
    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors(),
        ], 422);
    }

    try {
        // Mencari kategori berdasarkan ID
        $kategori = Kategori::findOrFail($id);

        // Memperbarui data kategori
        $kategori->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Kategori berhasil diperbarui',
            'data' => $kategori,
        ]);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Kategori tidak ditemukan',
        ], 404);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat memperbarui kategori',
        ], 500);
    }
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kategori  $kategori
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kategori $kategori)
    {
        $kategori->delete();
 
        return response()->json([
            'message' => 'success'
        ]);
    }
}
