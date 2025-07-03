import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Contact() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" placeholder="contato@suaong.org.br" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input id="telefone" placeholder="(11) 99999-9999" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="site">Site</Label>
                <Input id="site" type="url" placeholder="https://www.suaong.org.br" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" placeholder="facebook.com/suaong" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="instagram.com/suaong" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Endereço</Label>
                <Input placeholder="Rua/Avenida" className="mb-2" />
                <div className="grid gap-2 sm:grid-cols-3">
                    <Input placeholder="Número" />
                    <Input placeholder="Complemento" />
                    <Input placeholder="Bairro" />
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                    <Input placeholder="Cidade" defaultValue="Itu" />
                    <Input placeholder="Estado" defaultValue="SP" />
                    <Input placeholder="CEP" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="responsavel">Nome do Responsável *</Label>
                <Input id="responsavel" placeholder="Nome completo do responsável pela ONG" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="cargo-responsavel">Cargo do Responsável *</Label>
                <Input id="cargo-responsavel" placeholder="Ex: Presidente, Diretor, Coordenador" />
            </div>
        </div>
    )
} 