<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AssessmentController extends Controller
{
    /**
     * Daftar hasil asesmen untuk dashboard admin.
     */
    public function index()
    {
        return Assessment::query()
            ->orderByDesc('created_at')
            ->get();
    }

    /**
     * Simpan hasil asesmen dari formulir "Cek Kelayakan".
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => ['required', 'string', 'max:120'],
            'whatsapp' => ['required', 'string', 'max:30'],
            'jurusan' => ['required', 'string', 'max:120'],
            'bahasa' => ['nullable', 'string', 'max:120'],
            'sumber' => ['nullable', Rule::in(['web-cek-kelayakan', 'langsung'])],
            'answers' => ['nullable', 'array'],
            'rekomendasi' => ['nullable', 'array'],
        ]);

        $data['status'] = 'baru';
        $data['sumber'] = $data['sumber'] ?? 'web-cek-kelayakan';

        $assessment = Assessment::create($data);

        return response()->json($assessment, 201);
    }

    /**
     * Detail satu hasil asesmen.
     */
    public function show(string $id)
    {
        return Assessment::findOrFail($id);
    }

    /**
     * Perbarui data/status pendaftar dari dashboard admin.
     */
    public function update(Request $request, string $id)
    {
        $assessment = Assessment::findOrFail($id);

        $data = $request->validate([
            'nama' => ['sometimes', 'required', 'string', 'max:120'],
            'whatsapp' => ['sometimes', 'required', 'string', 'max:30'],
            'jurusan' => ['sometimes', 'required', 'string', 'max:120'],
            'bahasa' => ['nullable', 'string', 'max:120'],
            'status' => ['sometimes', Rule::in(['baru', 'di-hubungi', 'diterima', 'ditolak'])],
        ]);

        $assessment->update($data);

        return response()->json($assessment);
    }

    /**
     * Hapus pendaftar.
     */
    public function destroy(string $id)
    {
        Assessment::findOrFail($id)->delete();

        return response()->json(['message' => 'Data pendaftar dihapus.']);
    }
}
