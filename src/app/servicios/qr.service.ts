import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc ,setDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class QRService {

  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async cargarQr(hash: string): Promise<string> 
  {
    const user = this.auth.currentUser;
    if (!user) return 'No hay usuario logueado';

    const usuarioRef = doc(this.firestore, `usuarios/${user.uid}`);
    const qrRef = doc(this.firestore, `codigosQR/${hash}`);

    const [qrSnap, userSnap] = await Promise.all([getDoc(qrRef), getDoc(usuarioRef)]);

    if (!qrSnap.exists()) return 'El código QR no es válido';

    const qrValor = qrSnap.data()['valor'];
    const datosUsuario: any = userSnap.data() || {};
    const perfil = datosUsuario.perfil || 'usuario';
    const creditos = datosUsuario.creditos || 0;
    const codigos = datosUsuario.codigosCargados || {};

    const vecesCargado = codigos[hash] || 0;

    if (perfil !== 'admin' && vecesCargado > 0) return 'Este código ya fue usado';
    if (perfil === 'admin' && vecesCargado >= 2) return 'Este código ya se cargó dos veces';

    codigos[hash] = vecesCargado + 1;

    await updateDoc(usuarioRef, {
      creditos: creditos + qrValor,
      codigosCargados: codigos,
    });

    return `Crédito cargado correctamente (+${qrValor})`;
  }

  async limpiarCreditos(): Promise<void> 
  {
    const user = this.auth.currentUser;
    if (!user) return;

    const usuarioRef = doc(this.firestore, `usuarios/${user.uid}`);
    await updateDoc(usuarioRef, {
      creditos: 0,
      codigosCargados: {},
    });
  }

  async obtenerCreditos(): Promise<number> 
  {
    const user = this.auth.currentUser;
    if (!user) return 0;

    const usuarioRef = doc(this.firestore, `usuarios/${user.uid}`);
    const userSnap = await getDoc(usuarioRef);
    return userSnap.exists() ? userSnap.data()['creditos'] || 0 : 0;
  }

}
