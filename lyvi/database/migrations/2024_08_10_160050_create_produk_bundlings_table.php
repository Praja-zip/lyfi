<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produk_bundlings', function (Blueprint $table) {
            $table->id();
            $table->string('nama_bundle');
            $table->decimal('harga_bundle', 10, 2);
            $table->text('detail_bundle');
            $table->string('foto_bundle');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produk_bundlings');
    }
};
