<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Controllers\HitungPengunjungController;

class TrackVisitor
{
    public function handle(Request $request, Closure $next)
    {
        // Memanggil controller HitungPengunjung dan menjalankan metode trackVisitor
        $controller = new HitungPengunjungController();
        $controller->trackVisitor($request);

        // Melanjutkan request ke proses berikutnya
        return $next($request);
    }
}
