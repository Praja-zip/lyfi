<?php

namespace App\Http\Controllers;

use App\Models\Master_produk_bundling;
use Illuminate\Http\Request;

class MasterProdukBundlingController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin.auth')->only(['store', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Master_produk_bundling  $master_produk_bundling
     * @return \Illuminate\Http\Response
     */
    public function show(Master_produk_bundling $master_produk_bundling)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Master_produk_bundling  $master_produk_bundling
     * @return \Illuminate\Http\Response
     */
    public function edit(Master_produk_bundling $master_produk_bundling)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Master_produk_bundling  $master_produk_bundling
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Master_produk_bundling $master_produk_bundling)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Master_produk_bundling  $master_produk_bundling
     * @return \Illuminate\Http\Response
     */
    public function destroy(Master_produk_bundling $master_produk_bundling)
    {
        //
    }
}
