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
    Schema::create('hitung_pengunjungs', function (Blueprint $table) {
        $table->id();
        $table->string('ip_address', 45);
        $table->text('user_agent');
        $table->timestamp('visited_at')->useCurrent();
        $table->boolean('is_bot')->default(false);
        $table->timestamps();

        $table->index('ip_address');
        $table->index('visited_at');
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('hitung_pengunjungs');
    }
};
