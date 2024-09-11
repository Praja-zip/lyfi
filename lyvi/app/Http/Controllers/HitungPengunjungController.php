<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HitungPengunjung;

class HitungPengunjungController extends Controller
{
    public function trackVisitor(Request $request)
    {
        if (!$this->isBot($request)) {
            HitungPengunjung::create([
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'is_bot' => false,
                'visited_at' => now(),
            ]);

            return response()->json(['message' => 'Visitor tracked successfully'], 200);
        } else {
            return response()->json(['message' => 'Bot detected, not tracked'], 200);
        }
    }

    private function isBot(Request $request)
    {
        $bots = ['googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider'];
        $userAgent = strtolower($request->userAgent());

        foreach ($bots as $bot) {
            if (strpos($userAgent, $bot) !== false) {
                return true;
            }
        }

        return false;
    }

    public function showVisitorStats()
    {
        $totalVisitors = HitungPengunjung::count();
        $nonBotVisitors = HitungPengunjung::where('is_bot', false)->count();
        $latestVisitor = HitungPengunjung::orderBy('visited_at', 'desc')->first();

        return view('visitor_stats', [
            'totalVisitors' => $totalVisitors,
            'nonBotVisitors' => $nonBotVisitors,
            'latestVisitor' => $latestVisitor,
        ]);
    }

    // API endpoint to get visitor stats
    public function getVisitorStatsApi()
    {
        $totalVisitors = HitungPengunjung::count();
        $nonBotVisitors = HitungPengunjung::where('is_bot', false)->count();
        $latestVisitor = HitungPengunjung::orderBy('visited_at', 'desc')->first();

        return response()->json([
            'totalVisitors' => $totalVisitors,
            'nonBotVisitors' => $nonBotVisitors,
            'latestVisitor' => $latestVisitor,
        ]);
    }
}
