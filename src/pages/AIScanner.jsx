import {
  Camera,
  FileUp,
  Info,
  ListChecks,
} from "lucide-react"
import plasticBottle from "@/public/plastic-bottle.png"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const handlingSteps = [
  "Kosongkan isi botol dari sisa cairan.",
  "Bersihkan botol dengan sedikit air mengalir.",
  "Pisahkan tutup botol jika diperlukan oleh pengepul.",
  "Setorkan ke recycling point atau bank sampah terdekat.",
]

function AIScanner() {
  return (
    <div className="scanner-page">
      <section className="scanner-upload-column">
        <Card className="scanner-upload-card">
          <CardHeader className="scanner-upload-header">
            <CardTitle>Ambil Foto atau Unggah Gambar Sampahnya</CardTitle>

            <p>
              Gunakan kamera Anda untuk memindai objek secara real-time atau
              unggah dari galeri perangkat Anda.
            </p>
          </CardHeader>

          <CardContent className="scanner-upload-actions">
            <Button className="scanner-action-button">
              <Camera />
              Ambil Foto
            </Button>

            <Button className="scanner-action-button">
              <FileUp />
              Unggah Gambar
            </Button>
          </CardContent>
        </Card>

        <div className="scanner-preview">
          <img
            src={plasticBottle}
            alt="Botol plastik"
            className="scanner-preview-image"
          />
        </div>
      </section>

      <section className="scanner-result-column">
        <Card className="scanner-result-card">
          <CardHeader>
            <CardTitle className="scanner-card-title">
              <Info />
              <span>Hasil Scanning</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="scanner-result-content">
            <div className="scanner-result-item">
              <strong>NAMA SAMPAH</strong>
              <span>Botol Plastik</span>
            </div>

            <div className="scanner-result-item">
              <strong>MATERIAL</strong>
              <span>PET Plastic (Polyethylene Terephthalate)</span>
            </div>

            <div className="scanner-result-item">
              <strong>ESTIMASI BERAT</strong>
              <span>20g</span>
            </div>

            <div className="scanner-result-item">
              <strong>DAPAT DIDAUR ULANG</strong>
              <span className="scanner-recyclable">YA</span>
            </div>
          </CardContent>
        </Card>

        <Card className="scanner-handling-card">
          <CardHeader>
            <CardTitle className="scanner-card-title">
              <ListChecks />
              <span>Cara Mengelola</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="scanner-steps">
            {handlingSteps.map((step, index) => (
              <div className="scanner-step" key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default AIScanner