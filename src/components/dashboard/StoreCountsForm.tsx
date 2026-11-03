import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { stores } from "@/content/site";
import { useSaveStoreCounts, useStoreCounts } from "@/hooks/useStoreCounts";

const fields = [
  { key: "faststore", label: "Lojas FastStore" },
  { key: "storeFramework", label: "Lojas Store Framework" },
  { key: "wake", label: "Lojas Wake" },
  { key: "wordpress", label: "Projetos WordPress" },
] as const;

const ACTIONS_URL = "https://github.com/savioomio/portfolio/actions/workflows/deploy.yml";

/** O site é gerado no build: o número salvo aqui vai ao ar no próximo build. */
export function StoreCountsForm() {
  const saved = useStoreCounts();
  const save = useSaveStoreCounts();
  const [edited, setEdited] = useState<Partial<Record<(typeof fields)[number]["key"], string>>>({});

  const current = saved.data ?? stores;
  const valueOf = (key: (typeof fields)[number]["key"]) => edited[key] ?? String(current[key]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate(
      {
        faststore: Number(valueOf("faststore")),
        storeFramework: Number(valueOf("storeFramework")),
        wake: Number(valueOf("wake")),
        wordpress: Number(valueOf("wordpress")),
      },
      { onSuccess: () => setEdited({}) },
    );
  };

  return (
    <Card>
      <form onSubmit={submit}>
        <div className="grid grid-cols-2 gap-x-3">
          {fields.map(({ key, label }) => (
            <Field key={key} id={`contagem-${key}`} label={label}>
              <Input
                id={`contagem-${key}`}
                type="number"
                inputMode="numeric"
                min={0}
                max={999}
                step={1}
                required
                value={valueOf(key)}
                onChange={(event) => setEdited({ ...edited, [key]: event.target.value })}
              />
            </Field>
          ))}
        </div>
        <Button type="submit" size="sm" disabled={save.isPending || saved.isLoading}>
          {save.isPending && <Spinner />}
          Salvar contagens
        </Button>
        <p role="status" className="mt-3 text-sm">
          {save.isError && (
            <b className="text-danger">Não consegui salvar. Confira a conexão e tente de novo.</b>
          )}
          {save.isSuccess && <b>Salvo. </b>}
          {saved.isError && <b className="text-danger">Não consegui ler o banco. </b>}O site
          atualiza no build diário. Para publicar na hora, use{" "}
          <a className="font-bold" href={ACTIONS_URL} target="_blank" rel="noreferrer">
            Run workflow
          </a>{" "}
          no GitHub.
        </p>
      </form>
    </Card>
  );
}
