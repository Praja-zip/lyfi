public function handle($request, Closure $next)
{
    if (!$request->secure()) {
        return redirect()->secure($request->getRequestUri());
    }
    return $next($request);
}