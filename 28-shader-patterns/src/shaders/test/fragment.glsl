varying vec2 vUv;
#define M_PI 3.1415926535897932384626433832795;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main()
{   
    // //pattern 3 
    // float strength = vUv.x;
    // //pattern 4
    // float strength_4 = vUv.y * 10.0;
    // //patern7
    // float strength_7 = mod(vUv.y * 10.0, 1.0);
    // strength_7 = step(.5, strength_7);
    // //pattern 11
    // float strength_11 = step(0.9, mod(vUv.x * 10.0, 1.0));
    // strength_11 += step(0.5, mod(vUv.y * 10.0, 1.0));

    // //partern 15 
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

    // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // float strength_15 = barX + barY;

    // // float gradient = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // float gradient = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // float gradient_01 = random(vUv);

    // float falloff = 0.01 / distance(vUv, vec2(0.5));

    //pattern30
    // vec2 waveuv = vec2(
    //     vUv.x + tan(vUv.y * 30.0) * 0.1, 
    //     vUv.y + sin(vUv.x * 50.0) * 0.1
    // );
    float strength = (1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)));

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= M_PI + 2.0;
    // angle += 0.5;
    // angle *= 10.0;
    // angle = mod(angle, 1.0);
    // float strength = angle;



    gl_FragColor = vec4(strength, strength, strength, 1.0);
}