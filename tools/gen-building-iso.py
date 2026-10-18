import math, sys

def build(ink, paper, spark, labels=True, inline=False):
    S=30; C=math.sqrt(3)/2
    W,D=12.0,6.6; T=0.35; SP=8.0   # footprint, slab thickness, floor spacing
    Z=[0.0,SP,2*SP]
    pts_all=[]
    def P(x,y,z):
        p=((x-y)*C*S,(x+y)*0.5*S - z*S); pts_all.append(p); return p
    def f(v): return f'{v:.1f}'
    # colours: in inline mode use CSS variables with fallbacks
    INK = f'var(--ink,{ink})' if inline else ink
    PAP = f'var(--paper,{paper})' if inline else paper
    SPK = f'var(--spark,{spark})' if inline else spark
    def poly(pts, fill=None, stroke=None, w=1.2, op=None, dash=None):
        fill = PAP if fill is None else fill
        stroke = INK if stroke is None else stroke
        d=' '.join(f'{f(a)},{f(b)}' for a,b in (P(*p) for p in pts))
        x=f'<polygon points="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{w}" stroke-linejoin="round"'
        if op is not None: x+=f' stroke-opacity="{op}"'
        if dash: x+=f' stroke-dasharray="{dash}"'
        return x+'/>'
    def line(p,q,stroke=None,w=1.0,op=None,dash=None):
        stroke = INK if stroke is None else stroke
        a=P(*p); b=P(*q)
        x=f'<line x1="{f(a[0])}" y1="{f(a[1])}" x2="{f(b[0])}" y2="{f(b[1])}" stroke="{stroke}" stroke-width="{w}" stroke-linecap="round"'
        if op is not None: x+=f' stroke-opacity="{op}"'
        if dash: x+=f' stroke-dasharray="{dash}"'
        return x+'/>'
    def box(x0,y0,x1,y1,z,h,w=1.1):
        # top face at z+h; visible right (x=x1) and left (y=y1) faces
        zt=z+h
        return (poly([(x1,y0,zt),(x1,y1,zt),(x1,y1,z),(x1,y0,z)],w=w)+
                poly([(x0,y1,zt),(x1,y1,zt),(x1,y1,z),(x0,y1,z)],w=w)+
                poly([(x0,y0,zt),(x1,y0,zt),(x1,y1,zt),(x0,y1,zt)],w=w))
    def circ(cx,cy,z,r,w=1.1,fill=None,n=32):
        pts=[(cx+r*math.cos(2*math.pi*i/n), cy+r*math.sin(2*math.pi*i/n), z) for i in range(n)]
        return poly(pts,fill=fill,w=w)
    def person(x,y,z,h=0.95,hl=False):
        h=h*0.72
        a=P(x,y,z); b=P(x,y,z+h)
        col = SPK if hl else INK
        return (f'<line x1="{f(a[0])}" y1="{f(a[1])}" x2="{f(b[0])}" y2="{f(b[1])}" stroke="{col}" stroke-width="2.6" stroke-linecap="round"/>'
                f'<circle cx="{f(b[0])}" cy="{f(b[1]-3.6)}" r="3.6" fill="{col}"/>')
    out=[]
    def add(depth, svg): items.append((depth,svg))
    # ---------- site lines (under ground slab)
    site=[]
    for k,off in enumerate([1.4,2.8]):
        site.append(poly([(-off,-off,-T),(W+off,-off,-T),(W+off,D+off,-T),(-off,D+off,-T)],fill='none',w=0.8,op=0.45,dash='3 5'))
    # ---------- floors
    floors={}
    def slab(z):
        s=box(0,0,W,D,z-T,T,w=1.3)
        # inner border hairline on top face
        i=0.35
        s+=poly([(i,i,z),(W-i,i,z),(W-i,D-i,z),(i,D-i,z)],fill='none',w=0.6,op=0.5)
        return s
    def stairs(x0,y0,y1,z,n=8,rise=0.26,run=0.5):
        s=''
        for i in range(n):
            s+=box(x0+i*run,y0,x0+(i+1)*run,y1,z,rise*(i+1),w=0.9)
        return s
    # ---- Ground floor: pods
    g=[slab(Z[0])]
    items=[]
    pods=[(2.6,1.7),(6.0,1.7),(9.4,1.7),(2.6,3.7),(6.0,3.7),(9.4,3.7)]
    z=Z[0]
    for idx,(cx,cy) in enumerate(pods):
        svg=circ(cx,cy,z+0.5,0.85,w=1.2)
        svg+=line((cx,cy,z),(cx,cy,z+0.5),w=1.4)
        for k in range(5):
            a=2*math.pi*k/5+0.4
            svg+=person(cx+1.3*math.cos(a),cy+1.3*math.sin(a),z,0.8)
        if idx==1:
            svg+=person(cx,cy+1.25,z,1.0,hl=False)
        add(cx+cy,svg)
    # stair flight at front-left rising to the right
    add(0.5+D,stairs(0.9,D-1.5,D-0.6,z))
    for d,sv in sorted(items,key=lambda t:t[0]): g.append(sv)
    floors['g']=''.join(g)
    # ---- Floor 1: library
    z=Z[1]; items=[]
    f1=[slab(z)]
    for r,y in enumerate([0.8,1.8,2.8,3.8]):
        for c,(xa,xb) in enumerate([(0.9,3.7),(4.2,7.0)]):
            svg=box(xa,y,xb,y+0.55,z,0.38,w=1.0)
            if (r+c)%2==0:
                svg+=person(xa+1.0+0.5*c,y-0.28,z,0.85)
            add(xb+y,svg)
    # discussion rooms (glass: back walls + floor outline)
    for (xa,ya,xb,yb) in [(8.1,0.8,11.3,2.4),(8.1,2.8,11.3,4.3)]:
        z0=z; h=1.0
        svg=poly([(xa,ya,z0),(xb,ya,z0),(xb,yb,z0),(xa,yb,z0)],fill='none',w=0.8)
        svg+=poly([(xa,ya,z0),(xb,ya,z0),(xb,ya,z0+h),(xa,ya,z0+h)],w=1.0)
        svg+=poly([(xa,ya,z0),(xa,yb,z0),(xa,yb,z0+h),(xa,ya,z0+h)],w=1.0)
        cx,cy=(xa+xb)/2,(ya+yb)/2
        svg+=circ(cx,cy,z0+0.4,0.6,w=1.0)
        svg+=line((cx,cy,z0),(cx,cy,z0+0.4),w=1.2)
        for k in range(3):
            a=2*math.pi*k/3+0.8
            svg+=person(cx+0.95*math.cos(a),cy+0.95*math.sin(a),z0,0.75)
        add(xb+yb-0.5,svg)
    # cafe / atrium tables
    for (cx,cy) in [(9.3,5.4),(11.0,5.4)]:
        svg=circ(cx,cy,z+0.42,0.4,w=1.0)+line((cx,cy,z),(cx,cy,z+0.42),w=1.2)
        svg+=person(cx,cy+0.7,z,0.75)
        add(cx+cy,svg)
    add(0.5+D,stairs(0.9,D-1.5,D-0.6,z))
    for d,sv in sorted(items,key=lambda t:t[0]): f1.append(sv)
    floors['f1']=''.join(f1)
    # ---- Floor 2: venture
    z=Z[2]; items=[]
    f2=[slab(z)]
    # back wall panel with demo screen
    svg=poly([(0.0,0.0,z),(0.0,D,z),(0.0,D,z+2.2),(0.0,0.0,z+2.2)],w=1.0)
    svg+=poly([(0.0,1.2,z+0.9),(0.0,3.2,z+0.9),(0.0,3.2,z+1.9),(0.0,1.2,z+1.9)],fill='none',w=0.9)
    add(-1,svg)
    for r,y in enumerate([1.3,3.0]):
        for c,xa in enumerate([1.6,4.4]):
            svg=box(xa,y,xa+2.0,y+0.8,z,0.4,w=1.0)
            svg+=box(xa+0.5,y+0.15,xa+1.0,y+0.55,z+0.4,0.18,w=0.8)
            svg+=person(xa+1.0,y-0.3,z,0.85)
            add(xa+2.0+y+0.8,svg)
    # prototype bench
    svg=box(8.3,1.2,11.3,2.1,z,0.5,w=1.1)
    svg+=box(8.7,1.35,9.4,1.9,z+0.5,0.28,w=0.8)+box(9.8,1.35,10.2,1.9,z+0.5,0.5,w=0.8)
    svg+=person(9.8,0.8,z,0.9)
    add(11.3+2.1,svg)
    svg=box(8.6,3.7,10.6,4.4,z,0.45,w=1.0)+person(9.6,4.9,z,0.85)
    add(10.6+4.4,svg)
    for d,sv in sorted(items,key=lambda t:t[0]): f2.append(sv)
    floors['f2']=''.join(f2)
    # ---- columns between slabs (back first, then front)
    def columns(za,zb,front):
        s=''
        pts=[(0,0),(W,0)] if not front else [(0,D),(W,D)]
        for (x,y) in pts:
            s+=line((x,y,za),(x,y,zb-T),w=1.5)
        return s
    # ---- roof (wireframe)
    ov=0.9; ze=Z[2]+5.0; zr=ze+2.2
    roof=[]
    for (x,y) in [(0,0),(W,0),(0,D),(W,D)]:
        roof.append(line((x,y,Z[2]),(x,y,ze),w=1.3))
    # gable end (x=W+ov) and front slope
    roof.append(poly([(W+ov,-ov,ze),(W+ov,D+ov,ze),(W+ov,D/2,zr)],fill='none',w=1.4))
    roof.append(poly([(-ov,D+ov,ze),(W+ov,D+ov,ze),(W+ov,D/2,zr),(-ov,D/2,zr)],fill='none',w=1.4))
    roof.append(line((-ov,D/2,zr),(-ov,-ov,ze),w=1.1))
    roof.append(line((-ov,-ov,ze),(W+ov,-ov,ze),w=1.1))
    # rafters on front slope
    n=9
    for i in range(1,n):
        x=-ov+(W+2*ov)*i/n
        roof.append(line((x,D+ov,ze),(x,D/2,zr),w=0.7,op=0.55))
    # purlins (courses)
    for i in range(1,4):
        t=i/4
        y=D+ov-(D/2+ov)*t; zz=ze+(zr-ze)*t
        roof.append(line((-ov,y,zz),(W+ov,y,zz),w=0.7,op=0.55))
    # ---- thread
    nodes=[P(2.6,1.9,Z[0]+1.0),P(9.8,3.0,Z[1]+1.0),P(4.6,2.0,Z[2]+1.0)]
    a,b,c=nodes
    def curve(p,q):
        dy=(q[1]-p[1])*0.55
        return f'C {f(p[0])},{f(p[1]+dy)} {f(q[0])},{f(q[1]-dy)} {f(q[0])},{f(q[1])}'
    d=f'M {f(a[0])},{f(a[1])} {curve(a,b)} {curve(b,c)}'
    thread=(f'<path d="{d}" fill="none" stroke="{SPK}" stroke-width="2.6" stroke-linecap="round"/>'+
            ''.join(f'<circle cx="{f(p[0])}" cy="{f(p[1])}" r="6" fill="{PAP}" stroke="{SPK}" stroke-width="2.6"/><circle cx="{f(p[0])}" cy="{f(p[1])}" r="2.2" fill="{SPK}"/>' for p in nodes))
    # ---- labels
    lab=''
    if labels:
        for name,zz in zip(['G','1','2'],Z):
            p=P(0,D,zz); q=(p[0]-70,p[1]+10)
            lab+=f'<line x1="{f(p[0]-6)}" y1="{f(p[1]+2)}" x2="{f(q[0]+14)}" y2="{f(q[1]-6)}" stroke="{INK}" stroke-width="0.8" stroke-opacity="0.6"/>'
            lab+=f'<text x="{f(q[0])}" y="{f(q[1])}" font-family="Geist Mono, ui-monospace, Menlo, monospace" font-size="14" letter-spacing="1.5" fill="{INK}">{name}</text>'
    # ---- compose in painter order
    body=[]
    body.append(f'<g id="site">{"".join(site)}</g>')
    body.append(f'<g id="floor-g" class="floor" data-floor="g">{floors["g"]}</g>')
    body.append(f'<g id="columns-g1">{columns(Z[0],Z[1],False)}</g>')
    body.append(f'<g id="floor-1" class="floor" data-floor="1">{floors["f1"]}</g>')
    body.append(f'<g id="columns-12">{columns(Z[1],Z[2],False)}</g>')
    body.append(f'<g id="floor-2" class="floor" data-floor="2">{floors["f2"]}</g>')
    body.append(f'<g id="columns-front">{columns(Z[0],Z[1],True)}{columns(Z[1],Z[2],True)}</g>')
    body.append(f'<g id="roof">{"".join(roof)}</g>')
    body.append(f'<g id="thread">{thread}</g>')
    if labels: body.append(f'<g id="labels">{lab}</g>')
    # bbox
    for q in [P(-ov,D+ov,ze),P(W+ov,-ov,zr),P(-ov-1.4,D+1.4,-T),P(W+1.4,-1.4,-T),P(W+1.4,D+1.4,-T),P(-ov,-ov,zr)]: pass
    xs=[p[0] for p in pts_all]; ys=[p[1] for p in pts_all]
    m=44
    x0,x1=min(xs)-m-30,max(xs)+m; y0,y1=min(ys)-m,max(ys)+m
    vb=f'{f(x0)} {f(y0)} {f(x1-x0)} {f(y1-y0)}'
    bg='' if inline else f'<rect x="{f(x0)}" y="{f(y0)}" width="{f(x1-x0)}" height="{f(y1-y0)}" fill="{paper}"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-labelledby="t d">'
            f'<title id="t">Isometric drawing of the three-floor Synapse building</title>'
            f'<desc id="d">Exploded isometric view: ground floor learning pods, first floor library with silent hall, discussion rooms and cafe, second floor venture desks and bench, a pitched roof above. One vermilion line connects a person across the three floors.</desc>'
            f'{bg}{"".join(body)}</svg>')

if __name__=='__main__':
    import os
    out='assets/illustrations'; os.makedirs(out,exist_ok=True)
    open(f'{out}/building-iso-light.svg','w').write(build('#15130F','#F3EEE4','#D9481F'))
    open(f'{out}/building-iso-dark.svg','w').write(build('#F3EEE4','#15130F','#D9481F'))
    open(f'{out}/building-iso-inline.svg','w').write(build('#15130F','#F3EEE4','#D9481F',inline=True))
    print('ok')
